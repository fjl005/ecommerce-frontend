import { Row, Col } from 'reactstrap';
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import { useCartContext } from '../../contexts/CartContext';
import { useSavedItemContext } from '../../contexts/SavedItemContext';
import { axiosWithAuth } from '../miscellaneous/axios';
import DownloadLinkInSummary from './DownloadInSummarySection';
import ReviewInSummarySection from './ReviewInSummarySection';
import CartDynamicButtons from './CartDynamicButtons';
import FavoriteDynamicButtons from './FavoriteDynamicButtons';
import ProductTypeIcons from '../products/ProductTypeIcons';
import { Link } from 'react-router-dom';
import { useProductSearchContext } from '../../contexts/ProductSearchContext';
import { useState, useEffect } from 'react';

const ProductSummaryView = ({
    adminPage,
    inOrderJs,
    inFavoritesJs,
    inCartJs,
    isSaved,
    productItem,
    purchasedItem,
    orderId,
    buyer,
    idx,
}) => {

    if (inOrderJs) {
        productItem = purchasedItem;
    }

    const { fetchProduct } = useProductSearchContext();
    const [dataExists, setDataExists] = useState(true);

    // Check if product Exists.
    useEffect(() => {
        if (inOrderJs) {
            fetchProduct(purchasedItem.productId, () => null, setDataExists);
        }
    }, []);

    const { fetchCart } = useCartContext();
    const { setFavoritesLoadingOverlay } = useSavedItemContext();

    const removeFavoritesItem = async (productId) => {
        try {
            setFavoritesLoadingOverlay(true);
            await axiosWithAuth.delete(`/favorites/${productId}`);
            setFavoritesLoadingOverlay(false);
        } catch (error) {
            console.log('error in ProductChecklistView.js, removeFavoritesItem(): ', error);
            setFavoritesLoadingOverlay(false);
        }
    };

    const addCartFromFavorites = async (productId) => {
        try {
            setFavoritesLoadingOverlay(true);
            await axiosWithAuth.post(`/favorites/cart/${productId}`);
            setFavoritesLoadingOverlay(false);
            fetchCart();
        } catch (error) {
            console.log('error in ProductChecklistView.js, addCartFromFavorites(): ', error);
            setFavoritesLoadingOverlay(false);
        }
    };

    return (
        <>
            {idx > 0 && (
                <div className='gray-line-break mb-3'></div>
            )}
            <Row className='mb-3 pt-3'>
                <Col xs='12' sm='3'>
                    {productItem.pictures && (
                        <div className='d-flex'>
                            <img
                                src={(productItem.pictures.length > 0) ? productItem.pictures[0].url : fetsyEcommerceLogo}
                                alt={`${productItem.productName}`}
                                className='mx-auto mb-3 w-70'
                            />
                        </div>
                    )}
                </Col>

                <Col xs='12' sm='7'>
                    <div className='d-flex flex-column'>
                        {dataExists ? (
                            <Link to={`/products/${inOrderJs ? purchasedItem.productId : productItem._id}`} className='black-text'>
                                <h3 className='product-title'>
                                    {productItem.productName}
                                </h3>
                            </Link>
                        ) : (
                            <>
                                <h2>{productItem.productName}</h2>
                                <h6 className='red-text'>Product has been deleted, the review can still be updated.</h6>
                            </>
                        )}

                        <div className='product-gray-background'>
                            <ProductTypeIcons props={productItem.productType} />
                            {inOrderJs && (
                                <DownloadLinkInSummary productItem={productItem} />
                            )}
                        </div>

                        {inOrderJs && !adminPage && (
                            <div className='review-summary-lg'>
                                <ReviewInSummarySection
                                    purchasedItem={purchasedItem}
                                    orderId={orderId}
                                />
                            </div>
                        )}
                    </div>
                </Col>

                <Col xs='12' sm='2' className='product-summary-price-align'>
                    <div className='d-flex flex-column'>
                        {productItem.price && (
                            <h3 className='product-price-margin-top fetsy-brand-color'>${productItem.price.toFixed(2)}</h3>
                        )}
                        {inOrderJs && (!adminPage ? (
                            <div className='review-summary-xl'>
                                <ReviewInSummarySection
                                    purchasedItem={purchasedItem}
                                    orderId={orderId}
                                />
                            </div>
                        ) : (
                            <h5>Purchased by: {buyer}</h5>
                        ))}
                    </div>
                </Col>
            </Row>

            <Row>
                <Col className='mb-3'>
                    {inCartJs && (
                        <CartDynamicButtons
                            isSaved={isSaved}
                            productItem={productItem}
                        />
                    )}

                    {inFavoritesJs && (
                        <FavoriteDynamicButtons
                            productItem={productItem}
                            removeFavoritesItem={removeFavoritesItem}
                            addCartFromFavorites={addCartFromFavorites}
                        />
                    )}
                </Col>
            </Row>
        </>
    )
};

export default ProductSummaryView