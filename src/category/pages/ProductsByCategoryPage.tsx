import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { startGetCategoryById } from "../../store/auth/category/thunk";
import { CardsContainer } from "../../product/components/CardsContainer";
import '../../product/css/cards.css'
import { Loading } from "../../global-components/Loading";
import { Alert } from "../../global-components/Alert";

export const ProductsByCategoryPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { category, isLoading, errors } = useSelector((state:RootState) => state.category);

  useEffect(() => {
    dispatch(startGetCategoryById(Number(id)));
  }, [id,dispatch])

  if(isLoading) {
    return <Loading/>;
  }

  if(errors) { /* Muestra un mensaje de error, si una categoría no existe */
    return (
      <Alert type="danger" msg={ errors.msg } icon="error" />
    );
  }

  if(category?.products.length === 0) {
    
    return <Alert 
             type="primary" 
             msg={`Actualmente no hay productos con la categoría: ${ category.name }`} 
             icon="info-circle" 
            />;
  }

  return (
    
      <div className="cards">
        <div className="cards__title">
              <h3>{ category?.name }</h3>
              <hr />
        </div>
        <CardsContainer category={category} />
      </div>

   
  )
}
