export interface ListProducts {
    page:     number;
    size:     number;
    total:    number;
    products: Product[];
    empty:    boolean;
}

export interface Product {
    ok:true;
    productId:   number;
    userId:      number;
    categoryId:  number;
    name:        string;
    description: string;
    inStock:     number;
    price:       number;
    color:       string;
    state:       boolean;
    image:       null | string;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface ProductNotFound {
    ok:false;
    source:string;
    msg:string;
    field:string;
    status:number
}