import { User } from "./user.interface";

export interface AuthForm {
    name?:string;
    email:string;
    password:string;
}

export interface AuthResponse {
    ok:true;
    user:User;
    token:string;
}

export interface LoginBadCredentials {
    ok:false;
    msg?:string;
    email?:string;
    password?:string;
}

export interface BadRegister {
    ok:false;
    source?:string;
    msg?:string;
    field?:string;
    status?:number;
    email?:string;
    password?:string;
    name?:string;
}

export interface InvalidJWT {
    ok:false;
    msg:string;
    source:string;
}