import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCartPlus } from '@fortawesome/free-solid-svg-icons';

const FavoriteDynamicButtons = ({ productItem, removeFavoritesItem, addCartFromFavorites, }) => {

    return (
        <>
            <span
                className='product-summary-fxn-btn'
                onClick={() => removeFavoritesItem(productItem._id)}
            >
                <FontAwesomeIcon icon={faX} className='product-info-icon-align' />
                Remove From Favorites
            </span>

            <span
                className='product-summary-fxn-btn'
                onClick={() => addCartFromFavorites(productItem._id)}
            >
                <FontAwesomeIcon icon={faCartPlus} className='product-info-icon-align' />
                Add to Cart
            </span>
        </>
    )
}

export default FavoriteDynamicButtons