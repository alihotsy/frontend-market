import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";



interface Props {
    children: JSX.Element | JSX.Element[]
}

export const PrivateRoutes = ( { children }:Props ) => {

  const { authState } = useSelector(( state:RootState ) => state.auth);

  console.log(authState);

  return authState === 'authenticated'
          ? <> { children } </> 
          : <Navigate to={"/auth/login"} />
}
