import NavbarApp from "../../components/navbar/NavbarApp";
import { Container, Row, Col, Tooltip, } from "reactstrap";
import { useParams } from "react-router-dom";
import ProductImgCarousel from "../../components/products/ProductImgCarousel";
import ReviewsInSingleProductPage from "../../components/reviews/ReviewsInSingleProductPage";
import ProductDescription from "../../components/products/ProductDescription";
import { useState, useEffect } from "react";
import RightColToggle from "../../components/products/RightColToggle";
import { useCartContext } from "../../components/cart/CartContext";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";
import ProductTypeIcons from "../../components/products/ProductTypeIcons";
import DeliveryDetails from "../../components/products/DeliveryDetails";
import MeetTheSeller from "../../components/products/MeetTheSeller";

const SingleProductPage = () => {

    const { fetchCart } = useCartContext();
    const { productId } = useParams();
    const [selectedProduct, setSelectedProduct] = useState({});
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = async () => {
        try {
            const response = await axiosWithAuth.get(`/products/${productId}`);
            const data = response.data;
            setSelectedProduct(data);
            setLoadingPage(false);
        } catch (error) {
            console.log('error: ', error);
            setLoadingPage(false);
            setSelectedProduct(null);
        }
    };


    // Right Col Toggle States
    const [showDetails, setShowDetails] = useState(true);
    const [showDescription, setShowDescription] = useState(true);
    const [showDelivery, setShowDelivery] = useState(true);
    const [showSeller, setShowSeller] = useState(true);


    // Add to Cart Click
    const [tooltipAddCartSuccess, setTooltipAddCartSuccess] = useState(false);
    const [tooltipAddCartSignin, setTooltipAddCartSignin] = useState(false);
    const [tooltipCartTimeout, setTooltipCartTimeout] = useState(null);

    const addToCartClick = async (productId) => {
        if (tooltipCartTimeout) {
            clearTimeout(tooltipCartTimeout);
        }

        try {
            await axiosWithAuth.post(`/cart/${productId}`);
            fetchCart();
            setTooltipAddCartSuccess(true);

            const newTimeout = setTimeout(() => {
                setTooltipAddCartSuccess(false);
            }, 3000);

            setTooltipCartTimeout(newTimeout);
        } catch (error) {
            console.log('error: ', error);
            if (error.response.data === 'You must log in before accessing this page') {
                setTooltipAddCartSignin(true);

                const newTimeout = setTimeout(() => {
                    setTooltipAddCartSignin(false);
                }, 3000);

                setTooltipCartTimeout(newTimeout);
            }
        }
    };

    // Add to Favorites Click
    const [tooltipAddFavoriteSuccess, setTooltipAddFavoriteSuccess] = useState(false);
    const [tooltipAddFavoriteSignin, setTooltipAddFavoriteSignin] = useState(false);
    const [tooltipFavoriteTimeout, setTooltipFavoriteTimeout] = useState(null);

    const addToFavoritesClick = async (productId) => {
        if (tooltipFavoriteTimeout) {
            clearTimeout(tooltipFavoriteTimeout);
        }

        try {
            await axiosWithAuth.post(`/favorites`, { productId });
            setTooltipAddFavoriteSuccess(true);

            const newTimeout = setTimeout(() => {
                setTooltipAddFavoriteSuccess(false);
            }, 3000);

            setTooltipFavoriteTimeout(newTimeout);
            console.log('successfully added to favorites');

        } catch (error) {
            console.log('error: ', error);

            if (error.response.data === 'You must log in before accessing this page') {

                setTooltipAddFavoriteSignin(true);
                const newTimeout = setTimeout(() => {
                    setTooltipAddFavoriteSignin(false);
                }, 3000);

                setTooltipFavoriteTimeout(newTimeout);
            }
        }
    };

    const tooltipArr = [
        {
            tooltip: tooltipAddCartSignin,
            target: 'addCart',
            message: 'You must sign in to add items to your cart.',
            placement: 'top',
        },
        {
            tooltip: tooltipAddCartSuccess,
            target: 'addCart',
            message: 'Item added to Cart!',
            placement: 'top',
        },
        {
            tooltip: tooltipAddFavoriteSignin,
            target: 'addFavorite',
            message: 'You must sign in to add items to your Favorite.',
            placement: 'bottom'
        },
        {
            tooltip: tooltipAddFavoriteSuccess,
            target: 'addFavorite',
            message: 'Item added to Favorites!',
            placement: 'bottom'
        },
    ];


    return (
        <>
            <NavbarApp />
            {loadingPage ? (
                <Container>
                    <Row>
                        <Col>
                            <SpinningIcon size='2x' />
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Container style={{ marginTop: '1rem' }}>
                    {selectedProduct ? (
                        <Row>
                            <Col sm='12' xl='8' style={{ marginBottom: '1rem' }}>
                                <ProductImgCarousel selectedProduct={selectedProduct} />
                                <div className="d-none d-xl-block" style={{ marginTop: '1rem' }}>
                                    <ReviewsInSingleProductPage />
                                </div>
                            </Col>

                            <Col sm='12' xl='4'>
                                <div className='d-flex flex-column'>
                                    <h1 style={{ fontWeight: 'bold' }}>${selectedProduct.price.toFixed(2)}</h1>
                                    <h5 className='product-title'>{selectedProduct.name}</h5>
                                    <div
                                        id='addCart'
                                        className='product-page-add-to-cart'
                                        onClick={() => addToCartClick(selectedProduct._id)}
                                    >
                                        Add to cart
                                    </div>

                                    <div
                                        className='product-page-add-to-collection'
                                        id='addFavorite'
                                        onClick={() => addToFavoritesClick(selectedProduct._id)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            style={{ color: '#8B0000', marginRight: '0.5rem' }}
                                        />
                                        Add to Favorites
                                    </div>

                                    {tooltipArr.map((tooltipObj, idx) => (
                                        <Tooltip
                                            key={idx}
                                            isOpen={tooltipObj.tooltip}
                                            target={tooltipObj.target}
                                            placement={tooltipObj.placement}
                                        >
                                            {tooltipObj.message}
                                        </Tooltip>
                                    ))}

                                    <div>
                                        <RightColToggle
                                            section='Details'
                                            toggleState={showDetails}
                                            toggleStateFxn={setShowDetails}
                                        />

                                        {showDetails && (
                                            <div className='right-col-toggle-text-align'>
                                                <ProductTypeIcons productType={selectedProduct.productType} />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <RightColToggle
                                            section='Description'
                                            toggleState={showDescription}
                                            toggleStateFxn={setShowDescription}
                                        />
                                        {showDescription && (
                                            <div className='right-col-toggle-text-align'>
                                                <ProductDescription description={selectedProduct.description} />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <RightColToggle
                                            section='Delivery'
                                            toggleState={showDelivery}
                                            toggleStateFxn={setShowDelivery}
                                        />

                                        {showDelivery && (
                                            <div className='right-col-toggle-text-align'>
                                                <DeliveryDetails productType={selectedProduct.productType} />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <RightColToggle
                                            section='Meet Your Seller'
                                            toggleState={showSeller}
                                            toggleStateFxn={setShowSeller}
                                        />
                                        {showSeller && (
                                            <div className='right-col-toggle-text-align'>
                                                <MeetTheSeller />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Col>

                            <div className="d-xl-none">
                                <ReviewsInSingleProductPage />
                            </div>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <h1 className='text-center'>Product #{productId} doesn't exist.</h1>
                            </Col>
                        </Row>
                    )}
                </Container>
            )}
        </>

    );
};

export default SingleProductPage;