import { Navigate, Route, Routes } from "react-router-dom"
import { ProductsCardPage, ProductPage  } from "../product/pages"
import { SearchProductsPage } from "../search/pages/SearchProductsPage"
import { ProductsByCategoryPage } from "../category/pages/ProductsByCategoryPage"
import { MainLayout } from "../layouts/components/MainLayout"
import { CartPage } from "../cart/pages/CartPage"
import { PrivateRoutes  } from "./private/PrivateRoutes"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { useEffect } from 'react';
import { startGetCategories } from "../store/auth/category/thunk"
import { startGetProducts } from "../store/product/thunks"
import { startSetOrders } from "../store/order/thunk"


export const MainRoutes = () => {

  
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state:RootState) => state.auth);

  useEffect(() => {
    dispatch(startGetCategories());
    dispatch(startGetProducts());
  }, [dispatch])

  useEffect(() => {

    if(!user || !token) {
      return;
    }

    dispatch(startSetOrders(user.userId,token))
  }, [dispatch,user,token])


  return (
    <MainLayout>
        <Routes>
            <Route path="/" element={ <ProductsCardPage/>}/>
            <Route path="/product/:id" element={ <ProductPage/> }/> {/*Main Layout */}
            <Route path="/search" element={ <SearchProductsPage/> }/> {/*Main Layout */}
            <Route path="/category/:id" element={ <ProductsByCategoryPage/> }/> {/*Main Layout */}
            <Route path="*" element={ <Navigate to="/" /> }/> 

            <Route     /* TODO: No mostrar la barra de navegación al no estar autenticado */
              path="/cart" 
              element={
                <PrivateRoutes >
                  <CartPage/>
                </PrivateRoutes>
                }
             /> 
            
        </Routes>
    </MainLayout>
  )
}
