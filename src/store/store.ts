import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/slices/authSlice";
import { productSlice } from "./product/slices/productSlice";
import { categorySlice } from "./auth/category/slices/categorySlice";
import { orderSlice } from "./order/slices/orderSlice";
import { searchSlice } from "./search/slices/searchSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        product: productSlice.reducer,
        category: categorySlice.reducer,
        order: orderSlice.reducer,
        search: searchSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>