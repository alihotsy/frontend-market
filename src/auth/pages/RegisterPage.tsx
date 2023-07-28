
import { useForm } from "../../hooks/useForm";
import { FormEvent, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { startRegister } from "../../store/auth/thunks";
import { BadRegister } from "../../interfaces/auth.interface";
import { useRedirect } from "../../hooks/useRedirect";
import memoize from "fast-memoize";



const initValues = { 
  name:'',
  email:'',
  password:''
}

export const RegisterPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { authState, errors } = useSelector((state:RootState) => state.auth);
  const registerErrors = errors as BadRegister;

  const isChecking = useMemo(() => authState === 'checking', [authState]);

  const navigateTo = useRedirect(); //Custom hook which allows to navigate among paths such as /auth/login /auth/register, to clean up errors when trying to authenticate


  
  const getErrors: (field:string) => boolean = useMemo(() => { //TODO: implementing memoized function //Method which allows to validate and show errors messages for each form's input field
    
    return memoize((field:string) => { /* Memoize just works by implementing hooks: useCallback or useMemmo */
        if(registerErrors === null) {  /*Memoize allows to avoid re-renders */
           return false;
        }

        if(registerErrors.field === field) {
           return true;
        }

        const keys = Object.keys(registerErrors);
        return keys.includes(field);
      })
    }, [registerErrors])
    
    const { name, email, password, handleInputChange } = useForm( initValues );
    
    const register = (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(startRegister({ name,email,password }))
    }
    

  return (
    <form onSubmit={ register } className="login100-form" autoComplete="off">
                    
      <span className="login100-form-title p-b-25">
          Register
      </span>

    <div className={`${ getErrors('name') ? 'input-container' : '' } m-b-23`}>
      <div className="wrap-input100 m-b-9">
          <span className="label-input100">Name</span>
          <input className="input100"
              onChange={ handleInputChange }
              value={ name }
              type="text" 
              name="name" 
              placeholder="Ingrese su nombre"/>
          <span className="focus-input100"></span>
      </div>
      <span className="form-text text-danger">{ getErrors('name') && registerErrors?.name }</span>
    </div>
     

    <div className={`${ getErrors('email') ? 'input-container' : '' } m-b-23`}>
      <div className="wrap-input100 m-b-9">
          <span className="label-input100">Email</span>
          <input className="input100"
              onChange={ handleInputChange }
              value={ email }
              type="email" 
              name="email" 
              placeholder="Ingrese su email"/>
          <span className="focus-input100"></span>
      </div>
      <span className="form-text text-danger">{ (getErrors('email') && registerErrors?.email) ? registerErrors?.email : registerErrors?.msg }</span>
    </div>

    <div className={`${ getErrors('password') ? 'input-container' : '' } m-b-23`}>
      <div className="wrap-input100 m-b-9">
          <span className="label-input100">Password</span>
          <input className="input100"
              onChange={ handleInputChange }
              value={ password }
              type="password"
              name="password" 
              placeholder="Ingrese su contraseña"/>
          <span className="focus-input100"></span>
      </div>
      <span className="form-text text-danger">{ getErrors('password') && registerErrors?.password}</span>
    </div>
      
      <div className="text-right p-t-19 p-b-3"></div>
      
      <div className="container-login100-form-btn">
          <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn"></div>
              <button style={{ cursor:isChecking ? 'auto' : 'pointer' }} disabled={isChecking} className="login100-form-btn">
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
                     <span>Register</span>
                      
                  }
              </button>
          </div>
      </div>

      <div className="flex-col-c p-t-30 gap-3">
          <span className="txt1">
              Ya tengo una cuenta
          </span>

          <span onClick={ () => navigateTo('/auth/login')  } className="txt2">
              Ingrese Aquí
          </span>
      </div>
    </form>
  )
}
