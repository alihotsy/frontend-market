
import { useForm } from "../../hooks/useForm"
import { FormEvent, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from '../../store/auth/thunks';
import { AppDispatch, RootState } from "../../store/store";
import Swal from 'sweetalert2';
import { useRedirect } from "../../hooks/useRedirect";
import { BadRegister, InvalidJWT, LoginBadCredentials } from '../../interfaces/auth.interface';




const initValues = { 
    email:'',
    password:''
}

export const LoginPage = () => {

    const { authState, errors } = useSelector((state:RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigateTo = useRedirect();

    useEffect(() => {

        const errorJWT = errors as InvalidJWT | null;
        const badCredentials = errors as LoginBadCredentials | BadRegister | null;

        if(badCredentials && !errorJWT?.source) {

            Swal.fire({
                icon:'error',
                title: 'Mala Autenticación',
                text: badCredentials.msg || badCredentials.email || badCredentials.password
    
            })
        }

         
    }, [errors]);

   


    
    const isChecking = useMemo(() => authState === 'checking',[authState]);
    
    const { email, password, handleInputChange } = useForm( initValues );
    
    

    const login = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(startLogin({email,password}));
    }

  return (
    <form onSubmit={ login } className="login100-form" autoComplete="off">
                    
        <span className="login100-form-title p-b-49">
            Login
        </span>

        <div className="wrap-input100 m-b-23">
            <span className="label-input100">Email</span>
            <input className="input100"
                onChange={ handleInputChange }
                value={ email }
                type="email" 
                name="email" 
                placeholder="Ingrese su email"/>
            <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100">
            <span className="label-input100">Password</span>
            <input className="input100"
                onChange={ handleInputChange }
                value={ password }
                type="password"
                name="password" 
                placeholder="Ingrese su contraseña"/>
            <span className="focus-input100"></span>
        </div>
        
        <div className="text-right p-t-8 p-b-31"></div>
        
        <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button style={{ cursor:isChecking ? 'auto' : 'pointer' }} disabled={isChecking} type="submit" className="login100-form-btn">
                   {
                     isChecking 
                      ? 
                        <span 
                            style={{width:'25px',height:'25px'}} 
                            className="spinner-border spinner-border-sm" 
                            role="status" 
                            aria-hidden="true"
                        >
                        </span>
                      :
                        <span>Login</span>
                   }
                </button>
                
            </div>
        </div>

        <div className="flex-row p-t-30 gap-2 justify-content-center">
            <span className="txt1 p-b-17">
                ¿No tienes cuenta?
            </span>

            <span onClick={  () => navigateTo('/auth/register') } className="txt2">
                Crear una aquí
            </span>
        </div>
    </form>
  )
}
