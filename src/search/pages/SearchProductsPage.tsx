import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../product/css/cards.css';
import { CardsContainer } from '../../product/components/CardsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { startGetItemsByType } from '../../store/search/thunk';
import { Loading } from '../../global-components/Loading';
import { Alert } from '../../global-components/Alert';

export const SearchProductsPage = () => {

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products, total } = useSelector((state:RootState) => state.search);
  const q = searchParams.get('q') || '';

  useEffect(() => {
     dispatch(startGetItemsByType("products",q))
  }, [q,dispatch])

  if(isLoading) {
    return <Loading/>
  }

  if(products?.length === 0) {
    return <Alert type='primary' msg="No existe ningún producto(s) con ese término de búsqueda" icon='info-circle' />
  }

  return (
    <div className="cards">
        <div className="cards__title">
              <h3>Término de búsqueda: <span style={{color:'#275081'}}> <i>{ q }</i> </span></h3>
              <h5>Total de búsquedas: <span style={{color:'#24946B'}}>{ total }</span> </h5>
              <hr />
        </div>
        <CardsContainer productsBySearch={products}/>
    </div>
  )
}
