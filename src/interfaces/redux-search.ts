import { Category } from "./category.interface";
import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface SearchByGlobalState {
    isLoading:boolean;
    total:number;
    products?: Product[];
    users?: User[];
    categories?: Category[]
}
