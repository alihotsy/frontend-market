import { Product } from "./product.interface";

export interface Order {
    ok:        true;
    orderId:   OrderID;
    product:   Product;
    quantity:  number;
    state:     boolean;
    createdAt: Date;
    updatedAt: Date;
    subtotal:  number;
}

export interface OrderID {
    productId: number;
    userId:    number;
}

export interface ErrorResponse {
    ok:false;
    source:string;
    msg:string;
    field:string;
    status:number;
}

export interface OrderQuantity { 
    orderId:OrderID,
    quantity:number;
}


export interface OrderDeleted {
    ok:true;
    msg:string;
}

export interface Options {
    [key:string]:number;
}



