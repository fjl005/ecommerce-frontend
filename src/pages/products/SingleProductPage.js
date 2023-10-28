import NavbarApp from "../../components/navbar/NavbarApp";
import {
    Container,
    Row,
    Col,
    Button,
    Tooltip,
} from "reactstrap";
import { useParams } from "react-router-dom";
import ProductImgCarousel from "../../components/products/ProductImgCarousel";
import ReviewsInSingleProductPage from "../../components/reviews/ReviewsInSingleProductPage";
import ProductDescription from "../../components/products/ProductDescription";
import { useState, useEffect } from "react";
import RightColToggle from "../../components/products/RightColToggle";
import { useCartContext } from "../../components/cart/CartContext";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaperclip, faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';

const SingleProductPage = () => {

    const { addItemToCart, tooltipAddCartSignin, tooltipAddCartSuccess } = useCartContext();

    const { productId } = useParams();

    const [fetchDone, setFetchDone] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [tooltipAddFavorite, setTooltipAddFavorite] = useState(false);

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = async () => {
        try {
            const response = await axiosWithAuth.get(`/products/${productId}`);
            const data = response.data;
            setSelectedProduct(data);
            setFetchDone(true);
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const addItemToFavorites = async (productId) => {
        try {
            await axiosWithAuth.post(`/favorites`, { productId });
            setTooltipAddFavorite(true);
            setTimeout(() => {
                setTooltipAddFavorite(false);
            }, 3000);
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const [showHighlight, setShowHighlight] = useState(true);
    const [showDescription, setShowDescription] = useState(true);
    const [showDelivery, setShowDelivery] = useState(true);
    const [showSeller, setShowSeller] = useState(true);

    const toggleHighlight = () => {
        setShowHighlight(!showHighlight);
    };

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    const toggleDelivery = () => {
        setShowDelivery(!showDelivery);
    };

    const toggleSeller = () => {
        setShowSeller(!showSeller);
    };

    return (
        <>
            <NavbarApp />
            {fetchDone && (
                <Container className='product-page-container'>
                    <Row>
                        <Col sm='12' xl='8' style={{ marginBottom: '20px' }}>
                            <ProductImgCarousel selectedProduct={selectedProduct} />
                            {/* d-none makes the display none on all viewport sizes, but d-md-block applies the display: block to md+ viewport sizes. This makes it visible at these viewport sizes. */}
                            <div className="d-none d-xl-block" style={{ marginTop: '20px' }}>
                                <ReviewsInSingleProductPage />
                            </div>
                        </Col>

                        <Col sm='12' xl='4'>
                            <div className='d-flex flex-column'>
                                <h1 style={{ fontWeight: 'bold' }}>${selectedProduct.price.toFixed(2)}</h1>
                                <h5 className='product-title'>{selectedProduct.name}</h5>
                                <div
                                    id='addToCart'
                                    className='product-page-add-to-cart'
                                    onClick={() => addItemToCart(selectedProduct._id)}
                                >Add to cart</div>
                                <Tooltip
                                    isOpen={tooltipAddCartSignin}
                                    target='addToCart'
                                >
                                    You must sign in to add items to your cart.
                                </Tooltip>

                                <Tooltip
                                    isOpen={tooltipAddCartSuccess}
                                    target='addToCart'
                                >
                                    Item added to cart!
                                </Tooltip>

                                <div
                                    className='product-page-add-to-collection'
                                    id='addFavorite'
                                    onClick={() => addItemToFavorites(selectedProduct._id)}
                                >
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        style={{ color: '#8B0000', marginRight: '5px' }}
                                    />
                                    Add to Favorites
                                </div>

                                <Tooltip
                                    isOpen={tooltipAddFavorite}
                                    target='addFavorite'
                                    placement='bottom'
                                >
                                    Item added to Favorites!
                                </Tooltip>

                                <div>
                                    <RightColToggle
                                        section='Highlights'
                                        toggleState={showHighlight}
                                        toggleStateFxn={toggleHighlight}
                                    />

                                    {showHighlight && (
                                        <>
                                            <div className='icon-text-div'>
                                                <div className='icon-margin-align'>
                                                    <FontAwesomeIcon icon={faCloudArrowDown} />
                                                </div>
                                                <p>{selectedProduct.productType}</p>
                                            </div>
                                            <div className='icon-text-div'>
                                                <div className='icon-margin-align'>
                                                    <FontAwesomeIcon icon={faPaperclip} />
                                                </div>
                                                <p>Digital File Type(s): 1 PDF</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div>
                                    <RightColToggle
                                        section='Description'
                                        toggleState={showDescription}
                                        toggleStateFxn={toggleDescription}
                                    />
                                    {showDescription && (
                                        <ProductDescription
                                            description={selectedProduct.description}
                                        />
                                    )}
                                </div>

                                <div>
                                    <RightColToggle
                                        section='Delivery'
                                        toggleState={showDelivery}
                                        toggleStateFxn={toggleDelivery}
                                    />

                                    {showDelivery && selectedProduct.productType === 'Digital Download' && (
                                        <>
                                            <h5>Instant Download</h5>
                                            <p> Your files will be available to download once payment is confirmed. Instant download items don't accept returns, exchanges, or cancellations. Please contact the seller about any problems with your order.</p>
                                        </>
                                    )}
                                </div>

                                <div>
                                    <RightColToggle
                                        section='Meet Your Seller'
                                        toggleState={showSeller}
                                        toggleStateFxn={toggleSeller}
                                    />
                                    {showSeller && (
                                        <>
                                            <h5>Frank Lee</h5>
                                            <p>Owner of Fetsy</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Col>

                        <div className="d-xl-none">
                            <ReviewsInSingleProductPage />
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <h3>More from this shop</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Listed on Jun 9, 2023</p>
                            <Button>Report this item</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Breadcrumbs</p>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default SingleProductPage;