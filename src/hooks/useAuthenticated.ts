import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { RootState } from "../store/store";
import { useSelector } from "react-redux";


export const useAuthenticated = (path:string) => {

    const { authState } = useSelector(( state:RootState ) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        
        if(authState === 'authenticated') {
             navigate(path);
        }


    }, [authState,navigate,path])
}
