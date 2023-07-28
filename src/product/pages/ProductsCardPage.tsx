import { useSelector } from "react-redux";
import { CardsContainer } from "../components/CardsContainer"
import '../css/cards.css';
// import { useEffect } from 'react';
import { RootState } from "../../store/store";
// import { startGetProducts } from "../../store/product/thunks";
import { Loading } from "../../global-components/Loading";
// import { setProduct } from "../../store/product/slices/productSlice";



export const ProductsCardPage = () => {

  
  // const dispatch = useDispatch<AppDispatch>(); 
  const { isLoading } = useSelector((state:RootState) => state.product)

  // useEffect(() => {
  //    dispatch(startGetProducts())
  // }, [dispatch])

  if(isLoading) {
    return <Loading/>;
  }

  return (
    <section className="cards">

        <div className="cards__title">
            <h3>Products</h3>
            <hr />
        </div>

        <CardsContainer/>

    </section>
  )
}
