import axios, { AxiosError } from "axios";
import { AuthForm, AuthResponse, BadRegister, InvalidJWT, LoginBadCredentials } from "../interfaces/auth.interface";
const base_URL = import.meta.env.VITE_BASE_URL;

export const userLogin = async({ email, password }:AuthForm):Promise<AuthResponse | LoginBadCredentials> => {
    try {
        const data = (await axios.post(`${base_URL}/auth/login`,{email,password})).data;
        
        return {
            ok:true,
            ...data
        }
    } catch (error) {
        const resp = error as AxiosError;
        return resp.response?.data as LoginBadCredentials;
    }
}

export const userRegister = async({ name, email, password }:AuthForm):Promise<AuthResponse | BadRegister> => {

    try {
        const data = (await axios.post(`${base_URL}/users/register`,{name,email,password})).data;
        return {
            ok:true,
            ...data
        }
    } catch (error) {
        const resp = error as AxiosError;
        return resp.response?.data as BadRegister;
    }
}

export const renewToken = async(token:string):Promise<AuthResponse | InvalidJWT> => {

    try {
        const data = (await axios.get(`${ base_URL }/auth/renew-token`,{ headers:{ "Authorization": token}})).data;
        return {
            ok:true,
            ...data
        };

    } catch (error) {

        const resp = error as AxiosError;
        return resp.response?.data as InvalidJWT;
        
    }

}