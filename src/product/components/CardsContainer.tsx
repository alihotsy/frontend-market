import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getImage } from "../../helpers/uploads";
import { useNavigate } from "react-router-dom";
import { Category } from "../../interfaces/category.interface";
import { Product } from "../../interfaces/product.interface";


interface CategoryProps {
    category?:Category | null;
    productsBySearch?: Product[]
}

export const CardsContainer = ({ category, productsBySearch = [] }: CategoryProps) => { 

    const { products } = useSelector((state:RootState) => state.product);
    const navigate = useNavigate();

    let showProducts: Product[] = products;

    if(category) {
        showProducts = category.products;
    }

    if(productsBySearch.length > 0) {
       showProducts = productsBySearch;
    }

       

  return (
    <div className="cards__container">

        {
            showProducts.map(product => (
                <article onClick={ () => navigate(`/main/product/${ product.productId }`) } key={ product.productId } className="cards__card">
                    <div className="card__header">
                        <img className="header__img" src={getImage("products", product.image)} alt="" />
                    </div>
                    <div className="card__body">
                        <h5 className="card__title">{ product.name }</h5>
                        <span className="card__price">{`$ ${ product.price }`}</span>
                        <p className="card__description">{ product.description.substring(0,57) }</p>
                    
                    </div>
             </article>
            ))
        }

        {/* <article className="cards__card">
            <div className="card__header">
                <img className="header__img" src="" alt="" />
            </div>
            <div className="card__body">
            <h5>pc gammer</h5>
            </div>
        </article>

        <article className="cards__card">
            <div className="card__header">
                <img className="header__img" src="https://media.viajando.travel/p/afbaf7e5ad4c91a12e0ad36f6a1456af/adjuntos/236/imagenes/000/467/0000467327/1200x675/smart/cuchillos.png" alt="" />
            </div>
            <div className="card__body">
            <h5 className="card__title">Cuchillos de acero</h5>
            <span className="card__price">$ 3200</span>
            <p className="card__description">{ 'Cuchillos de acero inoxidabe hecho a base de titanio sólido. Hecho con fibra óptica'.substring(0,57) + '...' } <a href="#">Leer más</a></p>
            
            </div>
        </article>

        <article className="cards__card">
            <div className="card__header">
                <img className="header__img" src="" alt="" />
            </div>
            <div className="card__body">
                
            </div>
        </article>

        <article className="cards__card">

            <div className="card__header">
                <img className="header__img" src="" alt="" />
            </div>
            <div className="card__body">
                
            </div>

        </article>

        <article className="cards__card">
            <div className="card__header">
                <img className="header__img" src="" alt="" />
            </div>
            <div className="card__body">
                
            </div>
        </article>

        <article className="cards__card">
            <div className="card__header">
                <img className="header__img" src="" alt="" />
            </div>
            <div className="card__body">
                
            </div>
        </article>

        <article className="cards__card">
            <div className="card__header">
                <img className="header__img" src="" alt="" />
            </div>
            <div className="card__body">
                
            </div>
        </article>

            <article className="cards__card">

            <div className="card__header">
                <img className="header__img" src="" alt="" />
            </div>
            <div className="card__body">
                
            </div>

        </article> */}
    </div>
  )
}
