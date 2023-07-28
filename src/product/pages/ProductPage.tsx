import { useNavigate, useParams } from 'react-router-dom'
import '../css/product.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSetProduct } from '../../store/product/thunks';
import { AppDispatch, RootState } from '../../store/store';
import { getImage } from '../../helpers/uploads';
import { Loading } from '../../global-components/Loading';
import { setProduct } from '../../store/product/slices/productSlice';
import { Alert } from '../../global-components/Alert';
import { OrderQuantity } from '../../interfaces/order.interface';
import { startCreateOrder, startSetOrders } from '../../store/order/thunk';
import Swal from 'sweetalert2';
import { setErrors, setOrder } from '../../store/order/slices/orderSlice';


export const ProductPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { productSelected, isLoading, errorMsg } = useSelector((state:RootState) => state.product);
  const { token, user, authState } = useSelector((state:RootState) => state.auth);
  const { orderSelected, orderErrors } = useSelector((state:RootState) => state.order);
  
  useEffect(() => {
      dispatch(startSetProduct(Number(id)));

      return () => {
        dispatch(setProduct(null));
        dispatch(setOrder(null));
      }
  }, [id,dispatch]);

  useEffect(() => {

     if(orderSelected) {
       Swal.fire({
        icon: 'success',
        title: 'Agregado!',
        text: 'Tu producto ha sido agregado al carrito!',
      })
     }

     if(orderErrors) {
       Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
        text: `${ orderErrors?.msg }`,
      })

     }

     return () => {
      dispatch(setErrors(null));
     }


     
  }, [orderSelected,orderErrors,dispatch])

  useEffect(() => {

    if(orderSelected && token && user) {
      dispatch(startSetOrders(user?.userId,token))
    }

  },[orderSelected,token,dispatch,user])

  const addOrderToCart = (productId:number | undefined) => {

    if(authState === 'not-authenticated' || !productId || !token || !user) {
      return navigate('/auth/login');
    }

    const order:OrderQuantity = {
      orderId: {
        productId,
        userId: user.userId 
      },
      quantity:1
    }

    dispatch(startCreateOrder(order,token));
  }

  if(isLoading) {
    return <Loading/>;
  }

  if(errorMsg) {
    return <Alert type="danger" msg={ errorMsg } icon='error'/>
  }

  return (
    <div className='product__container'>
      <div className="container__content">
        <div className="content__img-container">
           <img className='img-container__img' src={ getImage('products',productSelected?.image || null) } alt="" />
        </div>

        <div className="content__desc">
          <h3 className='desc__title' >Detalles del producto</h3>
          {/* <hr /> */}
          <ul>
            <li className='desc__item'>
               <h5 className='item__title'>Nombre:</h5>
               <span>{ productSelected?.name }</span>
            </li>
            <li className='desc__item no-flex'>
               <h5 className='item__title'>Descripción:</h5>
               <span style={{fontSize:'1.1rem', paddingLeft:'9px'}} >- { productSelected?.description }</span>
            </li>
            <li className='desc__item'>
               <h5 className='item__title'>Cantidad disponible:</h5>
               <span>{ productSelected?.inStock }</span>
            </li>
            <li className='desc__item'>
               <h5 className='item__title'>Precio:</h5>
               <span className='item__price'>$ { productSelected?.price }</span>
            </li>
            <li className='desc__item'>
               <h5 className='item__title'>Estado:</h5>
               <span>{ productSelected?.state && 'Disponible' }</span>
            </li>
            
          </ul>
          <button onClick={() => addOrderToCart(productSelected?.productId)} className='btn btn-danger desc__btn'>
          <i className='bx bx-cart-add btn__cart-icon'></i>
            Agregar al carrito
          </button>
        </div>

      </div>
    </div>
  )
}
