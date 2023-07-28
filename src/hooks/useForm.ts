import { ChangeEvent, useState } from "react";
import { AuthForm } from "../interfaces/auth.interface";


export const useForm = (initValues:AuthForm) => {

    const [form,setForm] = useState<AuthForm> (initValues);
    
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>):void => {
       setForm( {
        ...form,
        [e.target.name]: e.target.value
       } );
    }
 

    return {
        ...form,
        handleInputChange
    }
  
}
