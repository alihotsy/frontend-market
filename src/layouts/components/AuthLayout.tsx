

import '../css/auth.css';
import { useRedirect } from '../../hooks/useRedirect';

interface Props {
    children: JSX.Element,
    customClassForBg?:string,
    customPositionForm?:string
}

export const AuthLayout = ( { children, customClassForBg = "", customPositionForm = "" }:Props ) => {

  
  const navigateTo = useRedirect();

  return (
    <div className={ `limiter ${ customClassForBg }` }>
        <nav className='nav-style-auth'>
          <div className="logo-container d-flex align-items-center gap-4">
            <div onClick={ () => navigateTo("/main") } className="logo d-flex align-items-center">
                <i className='bx bxl-shopify'></i>
                <span>Sellsmart</span>
            </div>
          </div>
        </nav>
        <div className="container-login100">
            <div className={`wrap-login100 p-l-55 p-r-55 p-t-40 p-b-30 ${ customPositionForm }`}>
                { children }  
            </div>
        </div>
</div>
  )
}
