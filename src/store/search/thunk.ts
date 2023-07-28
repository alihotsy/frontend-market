import { getItemsByType } from "../../helpers/search";
import { SearchBy } from "../../interfaces/search.interface";
import { AppDispatch } from "../store"
import { setIsLoading, setSearchProducts } from "./slices/searchSlice"



export const startGetItemsByType = (type:"products" | "categories" | "users",term:string,token?:string) => {
    return async(dispatch:AppDispatch) => {

        dispatch(setIsLoading());
        const resp:SearchBy = await getItemsByType(type,term,token);

        dispatch(setSearchProducts(resp));

    }
}