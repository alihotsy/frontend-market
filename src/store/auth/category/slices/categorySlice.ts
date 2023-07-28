import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryGlobalState } from "../../../../interfaces/redux-category";
import { Category, CategoryNotFound } from '../../../../interfaces/category.interface';

const initialState: CategoryGlobalState = {
    isLoading:false,
    errors:null,
    categories: [],
    category:null
}

export const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers: {
      setLoading: (state) => {
        state.isLoading = true;
      },

      setCategories: (state,action:PayloadAction<Category[]>) => {
        state.categories = action.payload;
      },
      setCategory: (state, action:PayloadAction<Category | null>) => {
        state.isLoading = false;
        state.category = action.payload;
        state.errors = null;
      },
      setErrors: (state, action:PayloadAction<CategoryNotFound | null>) => {
        state.category = null;
        state.errors = action.payload;
        state.isLoading = false;
      }
    }
});

export const { setLoading, setCategories, setCategory, setErrors } = categorySlice.actions;