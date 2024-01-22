import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCartPlus } from '@fortawesome/free-solid-svg-icons';

const FavoriteInSummarySection = ({ productItem, removeFavoritesItem, addCartFromFavorites, }) => {

    return (
        <>
            <span
                className='cart-remove-save-btn'
                onClick={() => removeFavoritesItem(productItem._id)}
            >
                <FontAwesomeIcon icon={faX} className='font-awesome-margin' />
                Remove From Favorites
            </span>

            <span
                className='cart-remove-save-btn'
                onClick={() => addCartFromFavorites(productItem._id)}
            >
                <FontAwesomeIcon icon={faCartPlus} className='font-awesome-margin' />
                Add to Cart
            </span>
        </>
    )
}

export default FavoriteInSummarySection