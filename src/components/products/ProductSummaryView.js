import { Row, Col } from 'reactstrap';
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import { useCartContext } from '../../contexts/CartContext';
import { useSavedItemContext } from '../../contexts/SavedItemContext';
import { axiosWithAuth } from '../miscellaneous/axios';
import DownloadLinkInSummary from '../summaryview/DownloadInSummarySection';
import ReviewInSummarySection from '../summaryview/ReviewInSummarySection';
import CartDynamicButtons from '../summaryview/CartDynamicButtons';
import FavoriteDynamicButtons from '../summaryview/FavoriteDynamicButtons';
import ProductTypeIcons from './ProductTypeIcons';
import { Link } from 'react-router-dom';


const ProductSummaryView = ({
    adminPage,
    inOrderJs,
    inFavoritesJs,
    inCartJs,
    isSaved,
    productItem,
    order,
    orderId,
    idx,
}) => {

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
                                alt={`${productItem.name}`}
                                style={{ width: '70%' }}
                                className='mx-auto mb-3'
                            />
                        </div>
                    )}
                </Col>

                <Col xs='12' sm='7'>
                    <div className='d-flex flex-column'>
                        <Link to={`/products/${inOrderJs ? productItem.productId : productItem._id}`} className='black-text'>
                            <h3 className='product-title'>
                                {productItem.name}
                            </h3>
                        </Link>
                        <div className='product-gray-background'>
                            <ProductTypeIcons props={productItem.productType} />

                            {inOrderJs && (
                                <DownloadLinkInSummary
                                    productItem={productItem}
                                    order={order}
                                    orderId={orderId}
                                />
                            )}
                        </div>

                        {inOrderJs && !adminPage && (
                            <div className='review-summary-lg'>
                                <ReviewInSummarySection
                                    productItem={productItem}
                                    orderId={orderId}
                                />
                            </div>
                        )}
                    </div>
                </Col>

                <Col xs='12' sm='2' className='product-summary-price-align'>
                    <div className='d-flex flex-column'>
                        {productItem.price && (
                            <h3 className='product-price-margin-top'>${productItem.price.toFixed(2)}</h3>
                        )}
                        {inOrderJs && !adminPage && (
                            <div className='review-summary-xl'>
                                <ReviewInSummarySection
                                    productItem={productItem}
                                    orderId={orderId}
                                />
                            </div>
                        )}
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