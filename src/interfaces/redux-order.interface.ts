import { ErrorResponse, Order, OrderDeleted, OrderID } from './order.interface';

export interface OrderGlobalState {
    orders:Order[];
    isLoading:boolean;
    isDeleting:boolean;
    isUpdating:boolean;
    orderSelected: Order | null;
    orderErrors: ErrorResponse | null;
    orderId: OrderID | null;
    successMsg: OrderDeleted | null;
}