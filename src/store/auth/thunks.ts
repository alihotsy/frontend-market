import { renewToken, userLogin, userRegister } from "../../helpers/auth";
import { AuthForm } from "../../interfaces/auth.interface";
import { AppDispatch } from "../store"
import { checkingCredentials, login, logout } from "./slices/authSlice"


export const startLogin = (credentials:AuthForm) => {

  return async(dispatch:AppDispatch) => {
       
    dispatch(checkingCredentials());

    const resp = await userLogin(credentials);

    if(!resp.ok) {
      localStorage.removeItem('token');
      return dispatch(logout(resp));
    }

    dispatch(login(resp));
    localStorage.setItem('token',resp.token);

  }
}


export const startRegister = (credentials:AuthForm) => {
    return async(dispatch:AppDispatch) => {
       
        dispatch(checkingCredentials());
    
        const resp = await userRegister(credentials);
    
        if(!resp.ok) {
          localStorage.removeItem('token');
          return dispatch(logout(resp));
        }
    
        dispatch(login(resp));
        localStorage.setItem('token',resp.token);
    
      }
}

export const startLogout = () => {
    return async(dispatch:AppDispatch) => {
        localStorage.removeItem('token');
        dispatch(logout(null))
    }
}

export const startRenewToken = (token:string) => {

    return async(dispatch:AppDispatch) => {
       
       dispatch(checkingCredentials());
       const resp = await renewToken(token);
       
       if(!resp.ok) {
         localStorage.removeItem('token');
         return dispatch(logout(resp));
       }

       dispatch(login(resp));
    }

}

