import { Navigate, Route, Routes } from "react-router-dom"
import { MainRoutes } from "./MainRoutes"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { startLogout, startRenewToken } from "../store/auth/thunks";
import { Loading } from "../global-components/Loading";



export const RouterApp = () => {

  const { authState } = useSelector((state:RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => { // TODO: Mejorar el backend: Solo el backend enviará como respuesta el token nada más en el login y register.

    const token = localStorage.getItem('token');

    if(!token) {
      localStorage.setItem('token','some-token'); //-> Esto permite que al ingresar las credenciales 
      dispatch(startLogout());                    //en el login/register y valide y encuentre errores, 
                                                 // entonces los datos ingresados no se purgarán.
                                                // Es decir, después de cliquear en el botón de login/registre no se muestre el estado de carga: esto
                                                // hace que después las credenciales desaparezcan.
      return; 
    }

    dispatch(startRenewToken(token));

  }, [dispatch])


  if(authState === 'checking' && localStorage.getItem('token')) { //Este es el estado de carga responsable que purgar los datos si las credenciales no son válidas, caso contrario entrará en estado de carga y el sistema evaluará la autenticación de un usuario
      return <Loading/>
  }

  return (
    
      <Routes>
         <Route path="/main/*" element={ <MainRoutes/> } />
         <Route path="/auth/*" element={ <AuthRoutes/> }/>
         <Route path="*" element={ <Navigate to="/main" /> }/> 
         {/*TODO: Mejorar la ruta con <Route path="*" el * representa una ruta privada o inexistente */}
           
      </Routes>
    
  )
}
