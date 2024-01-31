import { Row, Col } from 'reactstrap';
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import { useCartContext } from '../cart/CartContext';
import { axiosWithAuth } from '../miscellaneous/axios';
import DownloadLinkInSummary from '../summaryview/DownloadInSummarySection';
import ReviewInSummarySection from '../summaryview/ReviewInSummarySection';
import CartInSummarySection from '../summaryview/CartInSummarySection';
import FavoriteInSummarySection from '../summaryview/FavoriteInSummarySection';
import ProductTypeIcons from './ProductTypeIcons';


const ProductSummaryView = ({
    adminPage,
    inOrderJs,
    inFavoritesJs,
    inCartJs,
    isSaved,
    productItem,
    order,
    orderId,
    setFavoritesLoadingOverlay,
}) => {

    const {
        fetchCart
    } = useCartContext();


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

    console.log('product item pictures: ', productItem.pictures);


    return (
        <>
            <Row style={{ paddingTop: '10px', marginBottom: '10px', }}>
                <Col xs='12' sm='4' md='3'>
                    {productItem.pictures && (
                        <img
                            src={
                                (productItem.pictures.length > 0) ? productItem.pictures[0].url : fetsyEcommerceLogo
                            }
                            // src={fetsyEcommerceLogo}
                            alt={`Image for ${productItem.name}`}
                            style={{
                                width: '100%',
                                marginBottom: '20px'
                            }}
                        />
                    )}
                </Col>

                <Col xs='12' sm='8' md='6'>
                    <div className='d-flex flex-column'>
                        <h3 className='product-title'>{productItem.name}</h3>
                        <div className='product-gray-background'>
                            <ProductTypeIcons productType={productItem.productType} />

                            {inOrderJs && (
                                <DownloadLinkInSummary
                                    productItem={productItem}
                                    order={order}
                                    orderId={orderId}
                                />
                            )}
                        </div>
                    </div>
                </Col>

                <Col xs='12' md='3' className='order-item-price-review'>
                    <div className='d-flex flex-column'>
                        {productItem.price && (
                            <h3>${productItem.price.toFixed(2)}</h3>
                        )}

                        {inOrderJs && !adminPage && (
                            <ReviewInSummarySection
                                productItem={productItem}
                                orderId={orderId}
                            />
                        )}
                    </div>
                </Col>
            </Row>

            {inCartJs && (
                <Row>
                    <Col style={{ marginBottom: '10px' }}>
                        <CartInSummarySection
                            isSaved={isSaved}
                            productItem={productItem}
                        />
                    </Col>
                </Row>
            )}

            {inFavoritesJs && (
                <Row>
                    <Col style={{ marginBottom: '10px' }}>
                        <FavoriteInSummarySection
                            productItem={productItem}
                            removeFavoritesItem={removeFavoritesItem}
                            addCartFromFavorites={addCartFromFavorites}
                        />
                    </Col>
                </Row>
            )}
        </>
    )
};

export default ProductSummaryView