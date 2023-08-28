import NavbarApp from "../components/navbar/NavbarApp";
import { Container, Row, Col, Button, Tooltip, UncontrolledAccordion, Accordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap";
import { useParams } from "react-router-dom";
import { productsArray } from "../components/products/productsArray";
import ProductImgCarousel from "../components/products/ProductImgCarousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Reviews from "../components/reviews/Reviews";
import ProductDescription from "../components/products/ProductDescription";
import { useState, useEffect } from "react";
import RightColToggle from "../components/products/RightColToggle";
import axios from 'axios';
import { useCartContext } from "../components/cart/CartContext";


const SingleProduct = () => {
    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    const { addItemToCart, tooltipAddCartSignin, tooltipAddCartSuccess, cartLength } = useCartContext();

    const { productId } = useParams();
    const [fetchDone, setFetchDone] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});

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
    }

    const [showHighlight, setShowHighlight] = useState(true);
    const [showDescription, setShowDescription] = useState(true);
    const [showDelivery, setShowDelivery] = useState(true);
    const [showSeller, setShowSeller] = useState(true);

    const toggleHighlight = () => {
        setShowHighlight(!showHighlight);
    }

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    }

    const toggleDelivery = () => {
        setShowDelivery(!showDelivery);
    }

    const toggleSeller = () => {
        setShowSeller(!showSeller);
    }

    return (
        <>
            <NavbarApp cartLength={cartLength} />
            {/* <Container style={{ width: '70%', maxWidth: '70000px', backgroundColor: 'gray' }}> */}
            {fetchDone && (
                <Container className='product-page-container'>
                    <Row>
                        <Col sm='12' xl='8' style={{ marginBottom: '20px' }}>
                            <ProductImgCarousel selectedProduct={productsArray[0]} />
                            {/* d-none makes the display none on all viewport sizes, but d-md-block applies the display: block to md+ viewport sizes. This makes it visible at these viewport sizes. */}

                            <div className="d-none d-xl-block" style={{ marginTop: '20px' }}>
                                <Reviews />
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
                                {console.log('product info: ', selectedProduct)}
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

                                <div className='product-page-add-to-collection'>
                                    <i class="fa-solid fa-heart" style={{ color: '#8B0000', marginRight: '5px' }}></i>
                                    Add to Favorites
                                </div>

                                <div>
                                    <RightColToggle
                                        section='Highlights'
                                        toggleState={showHighlight}
                                        toggleStateFxn={toggleHighlight}
                                    />

                                    {showHighlight && (
                                        <>
                                            <p style={{ marginBottom: '10px' }}>
                                                {/* We create these div's of width 35px to make the text align the same, since the font awesome icons have slightly different widths. */}
                                                <div className='icon-margin-align'>
                                                    <i class="fa-solid fa-cloud-arrow-down"></i>
                                                </div>
                                                {selectedProduct.productType}
                                            </p>
                                            <p>
                                                <div className='icon-margin-align'>
                                                    <i class="fa-solid fa-paperclip"></i>
                                                </div>
                                                Digital File Type(s): 1 PDF
                                            </p>
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
                            <Reviews />
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
    )
}

export default SingleProduct;