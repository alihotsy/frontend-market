import { createOrder, deleteOrderById, getOrders, updateOrderById } from "../../helpers/order";
import { OrderID, OrderQuantity } from "../../interfaces/order.interface";
import { AppDispatch } from "../store";
import { deleteOrder, setErrors, setIsDeleting, setIsUpdating, setLoading, setOrder, setOrders, updateOrder } from "./slices/orderSlice";

export const startCreateOrder = (orderQuantity:OrderQuantity,token:string) => {

    return async(dispatch:AppDispatch) => {
        dispatch(setLoading());

        const resp = await createOrder(orderQuantity,token);

        if(!resp.ok) {
            return dispatch(setErrors(resp));
        }

        dispatch(setOrder(resp));

    }
}

export const startSetOrders = (userId:number,token:string) => {

    return async(dispatch:AppDispatch) => {
        dispatch(setLoading());
        const resp = await getOrders(userId,token);
        dispatch(setOrders(resp));
    }
}

export const startDeleteOrder = (orderId:OrderID,token:string) => {

    return async(dispatch:AppDispatch) => {

        dispatch(setIsDeleting(orderId));

        const resp = await deleteOrderById(orderId,token);

        if(!resp.ok) {
            return dispatch(setErrors(resp));
        }
        dispatch(deleteOrder(resp));
    }

}

export const startUpdateOrder = (order:OrderQuantity,token:string) => {

    return async(dispatch:AppDispatch) => {


         dispatch(setIsUpdating(order.orderId));

         const resp = await updateOrderById(order,token);

         if(!resp.ok) {
            return dispatch(setErrors(resp));
         }

         
         dispatch(updateOrder(resp));
    }

}