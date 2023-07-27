import NavbarApp from "../NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { productsArray } from "./productsArray";
import ProductImgCarousel from "./ProductImgCarousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SingleProduct = () => {
    const { productId } = useParams();
    const productIdNum = parseInt(productId);
    const selectedProduct = productsArray.filter((product) => product.productId === productIdNum)[0];

    return (
        <>
            <NavbarApp />
            {/* <Container style={{ width: '70%', maxWidth: '70000px', backgroundColor: 'gray' }}> */}
            <Container className='product-page-container'>

                <Row>
                    <Col sm='12' xl='8'>
                        <ProductImgCarousel selectedProduct={selectedProduct} />


                        {/* d-none makes the display none on all viewport sizes, but d-md-block applies the display: block to md+ viewport sizes. This makes it visible at these viewport sizes. */}

                        <div className="d-none d-md-block">
                            <p>Reviews at medium+ viewport sizes.</p>
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

                            <h3 style={{ marginTop: '20px' }}>Highlights</h3>
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
                            <h3>Description</h3>
                            <p>I am making the description long on purpose to create a really long column. I noticed on Etsy that this right column extends to the height of the image and reviews (on the left column). However, when brought to smaller viewport sizes, the order goes (1) image, (2) right column, (3) reviews. So, I created some viewport conditional rendering</p>
                            <p>Enter description here</p>
                            <p>Enter description here</p>
                            <p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p>
                        </div>
                    </Col>

                    <div className="d-md-none">
                        <p>Reviews at smaller viewport sizes</p>
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

                <Row>
                    <Col>
                        <div style={{ overflowY: 'scroll' }}>
                            <p>fdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdsofdasjofidsjfdosaijfdso

                                dasfsdadsa
                                sdafsdaf


                                asdfsdafsad
                                sadfsad
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SingleProduct;