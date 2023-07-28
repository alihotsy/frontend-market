import axios, { AxiosError } from "axios"
import { ListProducts, Product, ProductNotFound } from "../interfaces/product.interface";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const getProducts = async(): Promise<ListProducts> => {

    const data = (await axios.get<ListProducts>(`${ BASE_URL }/products?all=true`)).data;

    return data;

}

export const getProductById = async(id:number): Promise<Product | ProductNotFound> => {

    try {
        const data = (await axios.get(`${ BASE_URL }/products/id/${ id }`)).data;
        return {
            ok:true,
            ...data
        }
    } catch (error) {
        const resp = error as AxiosError;
        return resp.response?.data as ProductNotFound;
    }

}