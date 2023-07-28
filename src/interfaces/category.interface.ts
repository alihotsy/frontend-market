import { Product } from "./product.interface";

export interface Category {
    ok:true;
    categoryId:number;
    userId:number;
    products: Product[];
    name:string;
    image: null | string;
    state:boolean;
}

export interface CategoryNotFound {
    ok:false;
    source:string;
    msg:string;
    field:string;
    status:number;
}