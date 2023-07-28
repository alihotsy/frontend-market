import { Order } from "./order.interface";


export interface User {
    userId: number;
    name:   string;
    email:  string;
    role:   Role;
    bill:   Bill;
    image:  null | string;
    google: boolean;
    state:  boolean;
}

export interface Bill {
    orders: Order[];
    total:  number;
}







export enum Role {
    AdminRole = "ADMIN_ROLE",
    ClientRole = "CLIENT_ROLE",
    InventoryRole = "INVENTORY_ROLE",
}

