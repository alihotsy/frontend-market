import axios, { AxiosError } from "axios";
import { Category, CategoryNotFound } from "../interfaces/category.interface";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCategories = async():Promise<Category[]> => {

    const data = (await axios.get<Category[]>(`${ BASE_URL }/categories`)).data; 

    return data;
}

export const getCategoryById = async(id:number): Promise<Category | CategoryNotFound> => {

    try {
        const data = (await axios.get(`${ BASE_URL }/categories/id/${ id }`)).data;
        return {
            ok:true,
            ...data
        }
    } catch (error) {

        const errorMsg = error as AxiosError;

        return errorMsg.response?.data as CategoryNotFound;
        
    }

}