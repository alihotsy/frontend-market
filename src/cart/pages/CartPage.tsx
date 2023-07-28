
import { useDispatch, useSelector } from 'react-redux'
import '../cart.css'
import { AppDispatch, RootState } from '../../store/store'
import { getImage } from '../../helpers/uploads';
import { ChangeEvent, useEffect, useState } from 'react';
import { startDeleteOrder, startSetOrders, startUpdateOrder } from '../../store/order/thunk';
import { Loading } from '../../global-components/Loading';
import { Options, OrderID, OrderQuantity } from '../../interfaces/order.interface';
import Swal from 'sweetalert2';
import { setErrors } from '../../store/order/slices/orderSlice';

export const CartPage = () => {


  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state:RootState) => state.auth);
  const { orders, isLoading, isDeleting, isUpdating, orderId, orderErrors } = useSelector((state:RootState) => state.order);
  const [quantity, setQuantity] = useState<Options>({});

  useEffect(() => {

      orders.forEach((order) => {

        setQuantity(amount => {
          return {
            ...amount,
          [`${order.product.productId}`]:order.quantity
          }
        })
        
      })

  }, [orders]);


  useEffect(() => {

    if(!user || !token) {
      return;
    }

    dispatch(startSetOrders(user.userId,token))
  }, [dispatch,user,token]);

  useEffect(() => {

    if(orderErrors?.status === 400 ) {
      Swal.fire({
          icon: 'error',
          title: 'Algo salió mal!',
          text: `${ orderErrors?.msg }`,
      })
    }

    return () => {
      dispatch(setErrors(null))
    }

  }, [orderErrors,dispatch])

  //TODO://Mejorar el diseño de los pedidos, cada select se ve corrido con respecto a los demás



  const onSelectHandle = (e:ChangeEvent<HTMLSelectElement>, orderId:OrderID) => {

     if(isNaN(Number(e.target.value))) {
         return;
     }

     if(!token) {
       return;
     }

     setQuantity({
      ...quantity,
      [e.target.name]: Number(e.target.value)
     });

     const orderQuantity:OrderQuantity = {
       orderId,
       quantity: Number(e.target.value)
     }


     dispatch(startUpdateOrder(orderQuantity,token))
  }

  const deleteOrder = (orderId:OrderID) => {

    dispatch(startDeleteOrder(orderId,token || ''));

  }


  return (
    <div className="cart">
       <div className="cart__content">
         <h2 className='content__title' >Mi Carrito ({orders.length})</h2>
         <hr />
         <div className="content__products">
          
            {
              isLoading
               ?
                <Loading/>
               :
               orders.map((order) => (
                 
                  <div key={order.orderId.productId}>
                   <div className="products__product">
                     {
                       (isDeleting && JSON.stringify(order.orderId ) === JSON.stringify(orderId))
                  
                       ? <Loading height='auto' />
     
                       : 
                        <>
                         <div className='product__info'>
                             <div className="product__img">
                               <img src={ getImage("products",order.product.image) } alt="" />
                             </div>
                             <div className="product__desc">
                                 <h4>{ order.product.name }</h4>
                                 <span>Cantidad Disponible <strong>({ order.product.inStock })</strong></span>
                                 <span>Estado <strong className='text-success'>{ order.product.state ? 'Disponible' : 'Agotado' }</strong></span>
       
                                 <button onClick={ () => deleteOrder(order.orderId) } className='btn btn-danger btn-delete'>
                                   <i className='bx bx-trash'></i>
                                   Eliminar
                                 </button>
                                   
                                 
                             </div>
                         </div>
       
                         <div className='product__quantity'>
                           
                          <h6>Cantidad</h6>
                           <select onChange={ (e) => onSelectHandle(e,order.orderId) } name={ `${order.product.productId}` } value={ quantity[`${order.product.productId}`] } className="form-select" aria-label="Default select example">
                             <option value={1}>1</option>
                             <option value={2}>2</option>
                             <option value={3}>3</option>
                             <option value={4}>4</option>
                             <option value={5}>5</option>
                             <option value={6}>6</option>
                             <option value={7}>7</option>
                             <option value={8}>8</option>
                             <option value={9}>9</option>
                             <option value={10}>10</option>
                          </select>
                          {
                            isUpdating && JSON.stringify(orderId) === JSON.stringify(order.orderId)
                            &&
                            <Loading height="auto" />
                          }
                         </div>
       
                         <h2>$ { order.subtotal }</h2>
                        </>
                     }
  
                  </div>
                  <hr />
                  </div>
                ))
            }

            {
              orders.length === 0 &&
              <div className="alert alert-info">
                Tu carrito está vacío!
              </div>
            }
            
          
         </div>
         
         {
          orders.length > 0
           &&
            <div className="cart_total d-flex justify-content-end">
              <div className="total">
                  <h3>Total a pagar: $ { orders.reduce((acum,currentValue) => acum + currentValue.subtotal,0 )}</h3> 
                  <button className='btn btn-warning float-end mt-2'>Continuar compra</button>
              </div>
            </div>
         }
       </div>
    </div>
  )
}
