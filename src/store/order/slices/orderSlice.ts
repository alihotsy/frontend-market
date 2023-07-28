import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderGlobalState } from "../../../interfaces/redux-order.interface";
import { Order, ErrorResponse, OrderDeleted, OrderID } from "../../../interfaces/order.interface";


const initalState: OrderGlobalState = {
    orders:[],
    isLoading:false,
    orderSelected:null,
    orderErrors:null,
    isDeleting:false,
    isUpdating:false,
    orderId:null,
    successMsg:null
}

export const orderSlice = createSlice({
    name:'order',
    initialState: initalState,
    reducers: {
      setLoading: (state) => {
        state.isLoading = true;
      },
      setOrders: (state,action:PayloadAction<Order[]>) => {
        state.isLoading = false;
        state.orders = action.payload;
      },
      setOrder: (state,action:PayloadAction<Order | null>) => {
       state.isLoading = false;
       state.orderSelected = action.payload;
       state.orderErrors = null;
      },
      setIsDeleting: (state, action:PayloadAction<OrderID>) => {
        state.orderId = action.payload
        state.isDeleting = true;
      },
      setIsUpdating: (state, action:PayloadAction<OrderID>) => { 
        state.orderId = action.payload;
        state.isUpdating = true;
      },

      updateOrder: (state, action:PayloadAction<Order>) => {
        const orderUpdated:Order = action.payload;
        state.isUpdating = false;
        state.orders = state.orders.map(order => {

          return JSON.stringify(order.orderId) === JSON.stringify(orderUpdated.orderId)
                  ? orderUpdated
                  : order;
          
        }) 
      },
      deleteOrder: (state,action:PayloadAction<OrderDeleted>) => { 
    
        state.isDeleting = false;
        state.successMsg = action.payload;
        state.orders = state.orders.filter(order => JSON.stringify(order.orderId) !== JSON.stringify(state.orderId));

      },
      setErrors: (state,action:PayloadAction<ErrorResponse | null>) => {
        state.isLoading = false;
        state.isDeleting = false;
        state.isUpdating = false;
        state.orderSelected = null;
        state.orderId = null;
        state.orderErrors = action.payload;
     }
    }
});

export const { 
   setLoading, 
   setOrder, 
   setErrors, 
   setOrders,
   deleteOrder, 
   setIsDeleting,
   setIsUpdating,
   updateOrder
 } = orderSlice.actions;