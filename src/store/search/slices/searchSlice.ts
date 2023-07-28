import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SearchByGlobalState } from '../../../interfaces/redux-search';
import { SearchBy } from "../../../interfaces/search.interface";

const initialState:SearchByGlobalState = {
    isLoading:false,
    total:0,
    products: [],
    categories: [],
    users: [],

}

export const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers: {
      setIsLoading: (state) => {
        state.isLoading = true;
      },
      setSearchProducts: (state,action:PayloadAction<SearchBy>) => {
         state.isLoading = false;
         state.products = action.payload.products;
         state.total = action.payload.total;
      }
    }
});

export const { setIsLoading, setSearchProducts } = searchSlice.actions;