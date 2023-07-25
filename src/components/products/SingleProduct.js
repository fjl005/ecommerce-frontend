import NavbarApp from "../NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { productsArray } from "./productsArray";


const SingleProduct = () => {
    const { productId } = useParams();
    const productIdNum = parseInt(productId);
    const selectedProduct = productsArray.filter((product) => product.productId === productIdNum)[0];

    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col md='7'>
                        <img
                            src={selectedProduct.img}
                            alt={`image of ${selectedProduct.name}`}
                            style={{
                                width: '100%',
                                maxHeight: '800px',
                                objectFit: 'cover',
                            }}
                        />
                        {/* d-none makes the display none on all viewport sizes, but d-md-block applies the display: block to md+ viewport sizes. This makes it visible at these viewport sizes. */}
                        <div className="d-none d-md-block">
                            <Col>
                                <p>Reviews at medium+ viewport sizes.</p>
                            </Col>
                        </div>
                    </Col>

                    <Col sm='12' md='5'>
                        <div className='d-flex flex-column'>
                            <h4>${selectedProduct.price.toFixed(2)}</h4>
                            <h6>{selectedProduct.name}</h6>
                            <Button style={{ margin: '5px' }}>Add to cart</Button>
                            <Button style={{ margin: '5px' }}>Add to Collection</Button>
                            <h3>Highlights</h3>
                            <p>Digital Download</p>
                            <p>Digital File Type(s): 1 PDF</p>
                            <h3>Description</h3>
                            <p>I am making the description long on purpose to create a really long column. I noticed on Etsy that this right column extends to the height of the image and reviews (on the left column). However, when brought to smaller viewport sizes, the order goes (1) image, (2) right column, (3) reviews. So, I created some viewport conditional rendering</p>
                            <p>Enter description here</p>
                            <p>Enter description here</p>
                            <p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p>
                        </div>
                    </Col>

                    <div className="d-md-none">
                        <Col>
                            <p>Reviews at smaller viewport sizes</p>
                        </Col>
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

export default SingleProduct