
import { useMemo, useRef, ChangeEvent, useState, FormEvent } from 'react';
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
// import { getImage } from '../helpers/uploads';
import { startLogout } from '../store/auth/thunks';
// import { startGetCategories } from '../store/auth/category/thunk';
import { useGetImg } from '../hooks/useGetImg';
import { setErrors, setOrders } from '../store/order/slices/orderSlice';


export const Navbar = () => {


  const { authState, user } = useSelector((state:RootState) => state.auth);
  const { orders } = useSelector((state:RootState) => state.order);
  const { categories } = useSelector((state:RootState) => state.category);
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();


  // useEffect(() => {
  //   dispatch(startGetCategories());
  // }, [dispatch])


  const ref = useRef<HTMLUListElement>(null);
  const profileRef = useRef<HTMLUListElement>(null);

  const leftPropertyStyle:string = useMemo(() => authState === 'not-authenticated' ? 'calc(260px + 20px)' : '260px', [authState]);
  const loadImg = useGetImg();

  const showCategories = () => {
    ref.current?.classList.toggle('open');
  }

  const showProfile = () => {
    profileRef.current?.classList.toggle('open');
  }

  const logout = () => {
    dispatch(startLogout());
    dispatch(setOrders([]));
    dispatch(setErrors(null));

  }

  const onHandleSearchInput = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
  }

  const navigateToSearchComponent = () => {
     navigate({
       pathname: '/main/search',
       search: `?q=${ searchValue }`
     })
  }

  const onSubmitEvent = (e:FormEvent) => {
        e.preventDefault();
        navigateToSearchComponent();
  }


  return (
    <nav>
        <div className="logo-container d-flex align-items-center gap-4">
          <i className='bx bx-menu'></i>
          <Link to="/main" className="logo d-flex align-items-center">
              <i className='bx bxl-shopify'></i>
              <span>Sellsmart</span>
          </Link>
        </div>

          <div className="category d-flex align-items-center">
            <span onClick={showCategories} className='d-flex align-items-center'>Categories<i className='bx bx-caret-down'></i></span>
          </div>
          
              <ul ref={ref} style={{ position:'absolute', left:leftPropertyStyle }} className='categories-container'>

                {
                  categories.filter(category => category.state).map((category) => (
                    <li key={ category.categoryId } className='category-item'>
                      <Link to={`./category/${ category.categoryId }`}>
                        <i className='bx bx-chevrons-right'></i>
                        <span>{ category.name }</span>
                      </Link>
                    </li>

                  ))
                }
                 {/* <li className='category-item'>
                  <Link to="#">
                    <i className='bx bx-chevrons-right'></i>
                    <span>Artesanía</span>
                  </Link>
                 </li>
                 <li className='category-item'>
                  <Link to="#">
                    <i className='bx bx-chevrons-right'></i>
                    <span>Cocina</span>
                  </Link>
                 </li> */}
              </ul>
            

        <form onSubmit={ onSubmitEvent } className="search-container d-flex align-items-center gap-4">
            <input onChange={ onHandleSearchInput } value={searchValue} type="text" className="form-control" placeholder='Busca un producto...'/>
            <div onClick={ navigateToSearchComponent } className='search-icon'><i className='bx bx-search'></i></div>
        </form>

        {
          authState === 'authenticated' || localStorage.getItem('token')
            ? 
            <div onClick={showProfile} className="profile-container d-flex align-items-center gap-3">
              <div className="profile">
                {
                  authState === 'authenticated' && <img src={ loadImg("users") } alt="" /> //Evita que al cargar la página y el usuario está autenticado, se muestre una imagen en su perfil como si no estuviera autenticado
                }
              </div>
              <span>{ user?.name }</span>
            
              <ul ref={ profileRef } className='profile-menu'>
                <li className='profile-menu__list-item'>
                  <div className='list-item__content'>
                    <i className='bx bxs-user-circle'></i>
                    <span>My profile</span>
                  </div>
                </li>
                <li onClick={ logout } className='profile-menu__list-item'>
                  <div className='list-item__content'>
                    <i className='bx bx-power-off'></i>
                    <span>Logout</span>
                  </div>
                </li>
              </ul>
           </div>
            :
            <Link to="/auth/login" className="login-container d-flex align-items-center gap-1">
              <i className='bx bx-user-circle'></i>
              <span>Login</span>
            </Link>
        }
        
        
        

        <Link to={"./cart"} className="cart-logo-container d-flex align-items-center">
          <i className='bx bx-cart'></i>
          <div className='quantity'>
            <span>{ user ? orders.length : '0' }</span>
          </div>
        </Link>
    </nav>
    
  )
}
