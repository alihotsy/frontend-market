import { getCategories, getCategoryById } from "../../../helpers/category"
import { AppDispatch } from "../../store"
import { setCategories, setCategory, setErrors, setLoading } from "./slices/categorySlice"


export const startGetCategories = () => {
    return async(dispatch:AppDispatch) => {

        dispatch(setLoading());

        const resp = await getCategories();

        dispatch(setCategories(resp));
 
    }
}

export const startGetCategoryById = (id:number) => {

    return async(dispatch:AppDispatch) => {

        dispatch(setLoading());
        const resp = await getCategoryById(id);
        
        if(!resp.ok) {
          return dispatch(setErrors(resp));
        }

    

        dispatch(setCategory(resp));
    } 

}