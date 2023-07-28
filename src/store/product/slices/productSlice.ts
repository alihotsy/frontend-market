import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ListProducts, Product } from "../../../interfaces/product.interface";
import { ProductGlobalState } from "../../../interfaces/redux-product.interface";


const initialState: ProductGlobalState = {
    isLoading:false,
    page:0,
    size:0,
    total:0,
    products: [],
    productSelected: null,
    empty:true,
    errorMsg: null
}

export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers: {

        setLoading: (state) => {
           state.isLoading = true;
        },

        setProducts: (state,action:PayloadAction<ListProducts>) => {
          state.products = action.payload.products
          state.page = action.payload.page;
          state.total = action.payload.total;
          state.empty = action.payload.empty;
          state.isLoading = false;
        },

        setProduct : (state,action:PayloadAction<Product | null>) => {
          state.productSelected = action.payload;
          state.errorMsg = null;
          state.isLoading = false;
        },

        setErrorMsg: (state,action:PayloadAction<string | null>) => {
          state.errorMsg = action.payload;
          state.productSelected = null;
          state.isLoading = false;
        }
    }
});

export const { setLoading, setProducts, setProduct, setErrorMsg } = productSlice.actions;