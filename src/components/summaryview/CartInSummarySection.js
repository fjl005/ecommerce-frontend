import React from 'react'
import { useCartContext } from '../cart/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faCartPlus } from '@fortawesome/free-solid-svg-icons';


const CartInSummarySection = ({ isSaved, productItem }) => {
    const {
        saveLaterCartItem,
        removeCartItem,
        moveBackToCart,
        removeSavedItem,
        fetchCart
    } = useCartContext();

    return (
        <>
            <span
                className='cart-remove-save-btn'
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
                className='cart-remove-save-btn'
                style={{ marginLeft: '10px' }}
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
        </>
    )
}

export default CartInSummarySection