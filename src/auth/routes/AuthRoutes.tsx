import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages/"
import { AuthLayout } from "../../layouts/components/AuthLayout"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
// import { useEffect } from "react";
// import { Loading } from "../../global-components/Loading";


export const AuthRoutes = () => {

  const { authState } = useSelector(( state:RootState ) => state.auth);
  // const navigate = useNavigate();

  // useEffect(() => {

  //   if(authState === 'authenticated') {
  //     navigate('/main/cart');
  //   }

  // },[authState,navigate])

  if(authState === 'authenticated') { 
    console.log('Navigate');
    return <Navigate to={"/main"}/>
  }

  return (
    <Routes>
        <Route 
          path="/login" 
          element={ 
            <AuthLayout>
              <LoginPage/>
            </AuthLayout>
           }
        />
        
        <Route 
          path="/register" 
          element={
            <AuthLayout 
               customPositionForm="custom-position-form" 
               customClassForBg="custome-height-bg">
                <RegisterPage/>
            </AuthLayout> 
           }
        />

        <Route path="*" element={ <Navigate to="./login"/> }/>
    </Routes>
  )
}
