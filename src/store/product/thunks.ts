import { getProductById, getProducts } from "../../helpers/product"
import { AppDispatch } from "../store"
import { setErrorMsg, setLoading, setProduct, setProducts } from "./slices/productSlice";


export const startGetProducts = () => {
    return async(dispatch:AppDispatch) => {
        
        dispatch(setLoading());
       const resp = await getProducts();
       
       dispatch(setProducts(resp));
    }
}

export const startSetProduct = (id:number) => {
    return async(dispatch:AppDispatch) => {
        dispatch(setLoading());

        const resp = await getProductById(id);

        if(!resp.ok) {
          return dispatch(setErrorMsg("Producto no encontrado!"))
        }
         
        dispatch(setProduct(resp));

     }
}