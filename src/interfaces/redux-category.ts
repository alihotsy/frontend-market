import { Category, CategoryNotFound } from "./category.interface";

export interface CategoryGlobalState {
    isLoading:boolean;
    errors: CategoryNotFound | null;
    categories:Category[];
    category: Category | null;
}