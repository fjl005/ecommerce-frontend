import NavbarApp from "../NavbarApp";
import { Container, Row, Col, Button, UncontrolledAccordion, Accordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap";
import { useParams } from "react-router-dom";
import { productsArray } from "./productsArray";
import ProductImgCarousel from "./ProductImgCarousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Reviews from "../reviews/Reviews";
import ProductDescription from "./ProductDescription";
import { useState } from "react";
import RightColToggle from "./RightColToggle";


const SingleProduct = () => {
    const { productId } = useParams();
    const productIdNum = parseInt(productId);
    const selectedProduct = productsArray.filter((product) => product.productId === productIdNum)[0];

    const [highlight, setHighlight] = useState(true);
    const [description, setDescription] = useState(true);
    const [delivery, setDelivery] = useState(true);
    const [seller, setSeller] = useState(true);

    const toggleHighlight = () => {
        setHighlight(!highlight);
    }

    const toggleDescription = () => {
        setDescription(!description);
    }

    const toggleDelivery = () => {
        setDelivery(!delivery);
    }

    const toggleSeller = () => {
        setSeller(!seller);
    }

    return (
        <>
            <NavbarApp />
            {/* <Container style={{ width: '70%', maxWidth: '70000px', backgroundColor: 'gray' }}> */}
            <Container className='product-page-container'>

                <Row>
                    <Col sm='12' xl='8' style={{ marginBottom: '20px' }}>
                        <ProductImgCarousel selectedProduct={selectedProduct} />


                        {/* d-none makes the display none on all viewport sizes, but d-md-block applies the display: block to md+ viewport sizes. This makes it visible at these viewport sizes. */}

                        <div className="d-none d-xl-block" style={{ marginTop: '20px' }}>
                            <Reviews />
                        </div>

                    </Col>

                    <Col sm='12' xl='4'>
                        <div className='d-flex flex-column'>
                            <h1 style={{ fontWeight: 'bold' }}>${selectedProduct.price.toFixed(2)}</h1>
                            <h5>{selectedProduct.name}</h5>
                            <div className='product-page-add-to-cart'>Add to cart</div>
                            <div className='product-page-add-to-collection'>
                                <i class="fa-solid fa-heart" style={{ color: '#8B0000', marginRight: '5px' }}></i>
                                Add to Collection
                            </div>

                            <div>
                                <RightColToggle
                                    section='Highlights'
                                    toggleState={highlight}
                                    toggleStateFxn={toggleHighlight}
                                />

                                {highlight && (
                                    <>
                                        <p style={{ marginBottom: '10px' }}>
                                            <div style={{ width: '35px', display: 'inline-block' }}>
                                                <i class="fa-solid fa-cloud-arrow-down" style={{ width: '100%' }}></i>
                                            </div>
                                            Digital Download
                                        </p>
                                        <p>
                                            <div style={{ width: '35px', display: 'inline-block' }}>
                                                <i class="fa-solid fa-paperclip" style={{ marginRight: 'px' }}></i>
                                            </div>
                                            Digital File Type(s): 1 PDF
                                        </p>
                                    </>
                                )}

                            </div>

                            <div>
                                <RightColToggle
                                    section='Description'
                                    toggleState={description}
                                    toggleStateFxn={toggleDescription}
                                />
                                {description && (
                                    <ProductDescription />
                                )}
                            </div>

                            <div>
                                <RightColToggle
                                    section='Delivery'
                                    toggleState={delivery}
                                    toggleStateFxn={toggleDelivery}
                                />

                                {delivery && (
                                    <>
                                        <h5>Instand Download</h5>
                                        <p> Your files will be available to download once payment is confirmed. Instant download items don't accept returns, exchanges, or cancellations. Please contact the seller about any problems with your order.</p>
                                    </>
                                )}

                            </div>


                            <div>
                                <RightColToggle
                                    section='Meet Your Seller'
                                    toggleState={seller}
                                    toggleStateFxn={toggleSeller}
                                />

                                {seller && (
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
        </>
    )
}

export default SingleProduct;