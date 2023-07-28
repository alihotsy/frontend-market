import axios, { AxiosError } from "axios";
import { ErrorResponse, Order, OrderDeleted, OrderID, OrderQuantity } from "../interfaces/order.interface";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createOrder = async(order:OrderQuantity,token:string):Promise<Order | ErrorResponse> => {

    try {
        const resp = (await axios({
            method: 'POST',
            url: `${BASE_URL}/orders`,
            data: order,
            headers: {
                'Authorization':token
            }
        })).data

        return {
            ok:true,
            ...resp
        }
    } catch (error) {
        const errorResponse = error as AxiosError;
        return errorResponse.response?.data as ErrorResponse;
    }

}

export const getOrders = async(userId:number,token:string):Promise<Order[]> => {
    const resp = (await axios.get<Order[]>(`${ BASE_URL }/orders/${ userId }`,{headers:{'Authorization':token}})).data;
    return resp;
}

export const deleteOrderById = async(orderId:OrderID, token:string):Promise<OrderDeleted | ErrorResponse> => {

    try {
        const resp = (await axios.delete<OrderDeleted>(`${BASE_URL}/orders/orderId/${orderId.productId}/${orderId.userId}`,
                      {headers:{'Authorization':token}})).data;

        return resp;

    } catch (error) {
        const resp = error as AxiosError;
        return resp.response?.data as ErrorResponse;
    }

}

export const updateOrderById = async(orderQuantity:OrderQuantity,token:string):Promise<Order | ErrorResponse> => {
    try {

        const resp = (await axios({
            method:'PUT',
            url: `${ BASE_URL }/orders`,
            data:orderQuantity,
            headers: {
                'Authorization': token
            }
        })).data;


        return {
            ok:true,
            ...resp
        }
        
    } catch (error) {
        
        const errorResponse = error as AxiosError;
        return errorResponse.response?.data as ErrorResponse;
        
    }
}