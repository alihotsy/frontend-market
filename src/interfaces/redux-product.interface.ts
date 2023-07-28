import { Product } from "./product.interface";


export interface ProductGlobalState {
    page:     number;
    size:     number;
    total:    number;
    products: Product[];
    empty:    boolean;
    isLoading: boolean;
    productSelected: Product | null;
    errorMsg: string | null;
}

