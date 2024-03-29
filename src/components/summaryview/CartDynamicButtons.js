import React from 'react'
import { useCartContext } from '../../contexts/CartContext';
import { useSavedItemContext } from '../../contexts/SavedItemContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { axiosWithAuth } from '../miscellaneous/axios';


const CartDynamicButtons = ({ isSaved, productItem }) => {
    const {
        removeCartItem,
        fetchCart,
        setLoadingCartAndSaved,
    } = useCartContext();
    const {
        saveLaterCartItem,
        removeSavedItem,
        moveBackToCart,
        fetchSaved,
    } = useSavedItemContext();

    const moveItemToFav = async (productId, origin) => {
        try {
            setLoadingCartAndSaved(true);
            await axiosWithAuth.put(`/favorites/moveItemFromCart`, { productId, origin });
            await fetchCart();
            await fetchSaved();
            console.log('successfully added to favorites');
            setLoadingCartAndSaved(false);
        } catch (error) {
            setLoadingCartAndSaved(false);
            console.log('error: ', error);
        }
    };


    return (
        <div className='d-flex'>
            <span
                className='product-summary-fxn-btn'
                onClick={() => {
                    isSaved
                        ? removeSavedItem(productItem._id)
                        : removeCartItem(productItem._id)
                }}
            >
                <FontAwesomeIcon icon={faX} className='product-info-icon-align' />
                Remove
            </span>

            <span
                className='product-summary-fxn-btn ml-3'
                onClick={() => {
                    isSaved
                        ? moveBackToCart(productItem._id)
                        : saveLaterCartItem(productItem._id)
                }}
            >
                {isSaved ? (
                    <>
                        <FontAwesomeIcon icon={faCartPlus} className='product-info-icon-align' />
                        Move to Cart
                    </>
                ) : (
                    <> Save for Later </>
                )}
            </span>

            <span
                className='product-summary-fxn-btn ml-3'
                onClick={() => {
                    isSaved
                        ? moveItemToFav(productItem._id, 'saved')
                        : moveItemToFav(productItem._id, 'cart')
                }}
            >
                Move to Favorites
            </span>
        </div>
    )
}

export default CartDynamicButtons