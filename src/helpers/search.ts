import axios from "axios"
import { SearchBy } from "../interfaces/search.interface"
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getItemsByType = async(
    type: "products" | "users" | "categories", 
    term:string, 
    token?:string
): Promise<SearchBy> => {

    const resp = (await axios.get<SearchBy>(`${ BASE_URL }/search/${ type }?q=${ term }`,{
        headers: {'Authorization':token}
    })).data;

    return resp;

}

