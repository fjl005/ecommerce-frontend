import NavbarApp from "../../components/navbar/NavbarApp";
import { Container, Row, Col, Tooltip, } from "reactstrap";
import { useParams } from "react-router-dom";
import ProductImgCarousel from "../../components/singleproductpage/ProductImgCarousel";
import ReviewsInSingleProductPage from "../../components/reviews/ReviewsInSingleProductPage";
import ProductDescription from "../../components/singleproductpage/ProductDescription";
import { useState, useEffect } from "react";
import RightColToggle from "../../components/singleproductpage/RightColToggle";
import { useCartContext } from "../../contexts/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";
import ProductTypeIcons from "../../components/products/ProductTypeIcons";
import DeliveryDetails from "../../components/singleproductpage/DeliveryDetails";
import MeetTheSeller from "../../components/singleproductpage/MeetTheSeller";
import { axiosWithAuth } from "../../components/miscellaneous/axios";


const ERROR_CODES = {
    mustLogin: 'You must log in before accessing this page',
};

const RIGHT_COL_TOGGLE = {
    details: {
        title: 'Details',
        stateKey: 'showDetails',
    },

    description: {
        title: 'Description',
        stateKey: 'showDescription',
    },

    delivery: {
        title: 'Delivery',
        stateKey: 'showDelivery',
    },

    seller: {
        title: 'Seller',
        stateKey: 'showSeller',
    },
};

const ADD_CLICK_CATEGORY = {
    cart: 'cart',
    favorites: 'favorites',
    success: 'success',
    signin: 'signin',
    addToCart: 'addToCart',
    addToFavorites: 'addToFavorites',

}

const SingleProductPage = () => {

    const { fetchCart } = useCartContext();
    const { productId } = useParams();
    const [selectedProduct, setSelectedProduct] = useState({});
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axiosWithAuth.get(`/products/${productId}`);
                const data = response.data;
                setSelectedProduct(data);
            } catch (error) {
                console.log('error: ', error);
                setSelectedProduct(null);
            } finally {
                setLoadingPage(false);
            }
        };

        fetchProductData();
    }, []);

    const [rightColToggle, setRightColToggle] = useState({
        [RIGHT_COL_TOGGLE.details.stateKey]: true,
        [RIGHT_COL_TOGGLE.description.stateKey]: true,
        [RIGHT_COL_TOGGLE.delivery.stateKey]: true,
        [RIGHT_COL_TOGGLE.seller.stateKey]: true,
    });

    const [tooltipCart, setTooltipCart] = useState({
        success: false,
        signin: false,
        timeout: null,
    });

    const [tooltipFavorites, setTooltipFavorites] = useState({
        success: false,
        signin: false,
        timeout: null,
    });

    const addClickCartOrFav = async (category, tooltip, setTooltip,) => {
        if (tooltip.timeout) {
            clearTimeout(tooltip.timeout);
        }

        try {
            if (category === ADD_CLICK_CATEGORY.cart) {
                await axiosWithAuth.post(`/cart/${productId}`);
                fetchCart();
            } else if (category === ADD_CLICK_CATEGORY.favorites) {
                await axiosWithAuth.post(`/favorites`, { productId });
            }

            tooltipReset(setTooltip, ADD_CLICK_CATEGORY.success);
        } catch (error) {
            console.log('error: ', error);
            if (error.response.data === ERROR_CODES.mustLogin) {
                tooltipReset(setTooltip, ADD_CLICK_CATEGORY.signin);
            }
        }
    };

    function tooltipReset(setTooltipFxn, type) {
        setTooltipFxn(prevState => ({ ...prevState, [type]: true }));

        const newTimeout = setTimeout(() => {
            setTooltipFxn(prevState => ({ ...prevState, [type]: false }));
        }, 3000);

        setTooltipFxn(prevState => ({ ...prevState, timeout: newTimeout }));
    }

    const tooltipArr = [
        {
            tooltip: tooltipCart.signin,
            target: ADD_CLICK_CATEGORY.addToCart,
            message: 'You must sign in to add items to your cart.',
            placement: 'top',
        },
        {
            tooltip: tooltipCart.success,
            target: ADD_CLICK_CATEGORY.addToCart,
            message: 'Item added to Cart!',
            placement: 'top',
        },
        {
            tooltip: tooltipFavorites.signin,
            target: ADD_CLICK_CATEGORY.addToFavorites,
            message: 'You must sign in to add items to your Favorite.',
            placement: 'bottom'
        },
        {
            tooltip: tooltipFavorites.success,
            target: ADD_CLICK_CATEGORY.addToFavorites,
            message: 'Item added to Favorites!',
            placement: 'bottom'
        },
    ];

    const rightCols = [
        {
            stateKey: RIGHT_COL_TOGGLE.details.stateKey,
            title: RIGHT_COL_TOGGLE.details.title,
            render: ProductTypeIcons,
            props: selectedProduct && selectedProduct.productType,
        },
        {
            stateKey: RIGHT_COL_TOGGLE.description.stateKey,
            title: RIGHT_COL_TOGGLE.description.title,
            render: ProductDescription,
            props: selectedProduct && selectedProduct.description,
        },
        {
            stateKey: RIGHT_COL_TOGGLE.delivery.stateKey,
            title: RIGHT_COL_TOGGLE.delivery.title,
            render: DeliveryDetails,
            props: selectedProduct && selectedProduct.productType,
        },
        {
            stateKey: RIGHT_COL_TOGGLE.seller.stateKey,
            title: RIGHT_COL_TOGGLE.seller.title,
            render: MeetTheSeller,
            props: null,
        },
    ];


    return (
        <>
            <NavbarApp />
            <Container className='mt-3'>
                {loadingPage ? (
                    <Row>
                        <Col>
                            <SpinningIcon size='2x' />
                        </Col>
                    </Row>
                ) : (
                    <>
                        {selectedProduct ? (
                            <Row>
                                <Col sm='12' lg='8' className='mb-3'>
                                    <ProductImgCarousel selectedProduct={selectedProduct} />
                                    <div className="d-none d-lg-block mt-3">
                                        <ReviewsInSingleProductPage />
                                    </div>
                                </Col>

                                <Col sm='12' lg='4'>
                                    <div className='d-flex flex-column'>
                                        <h1 className='bold-text'>${selectedProduct.price.toFixed(2)}</h1>
                                        <h5 className='product-title'>{selectedProduct.productName}</h5>
                                        <div
                                            id={ADD_CLICK_CATEGORY.addToCart}
                                            className='product-page-add-button product-page-add-to-cart'
                                            onClick={() => addClickCartOrFav(ADD_CLICK_CATEGORY.cart, tooltipCart, setTooltipCart)}
                                        >
                                            Add to cart
                                        </div>

                                        <div
                                            className='product-page-add-button product-page-add-to-collection'
                                            id={ADD_CLICK_CATEGORY.addToFavorites}
                                            onClick={() => addClickCartOrFav(ADD_CLICK_CATEGORY.favorites, tooltipFavorites, setTooltipFavorites)}
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

                                        {rightCols.map((section, idx) => (
                                            <div key={idx}>
                                                <RightColToggle
                                                    stateKey={section.stateKey}
                                                    title={section.title}
                                                    state={rightColToggle}
                                                    setState={setRightColToggle}
                                                />
                                                {rightColToggle[section.stateKey] && (
                                                    <div className='ml-3'>
                                                        {section.render && <section.render props={section.props} />}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Col>

                                <div className="d-lg-none">
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
                    </>
                )}
            </Container>
        </>
    );
};

export default SingleProductPage;