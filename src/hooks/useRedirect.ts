import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { useNavigate } from "react-router-dom";
import { startLogout } from "../store/auth/thunks";
import { useCallback } from "react";


export const useRedirect = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const navigateTo = useCallback( (path:string) => {
        dispatch(startLogout())
        navigate(path);
    },[dispatch,navigate])
    return navigateTo;
}
