import { Container, Row, Col } from "reactstrap";
import { productsArray } from "./productsArray";
import { Link } from "react-router-dom";

const Products = () => {

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
            </Row>
            <Row>
                {productsArray.map((product, idx) => (
                    <Col key={idx} xs='6' md='4' lg='3' className='product-item-homepage'>
                        <Link to={`/products/${product.productId}`} target='_blank' style={{
                            textDecoration: 'none',
                            color: 'black'
                        }}>
                            <div style={{
                                width: '100%',
                                padding: '10px 5px'
                            }}>
                                <img
                                    src={product.img[0]}
                                    alt='image of product'
                                    style={{
                                        width: '100%',
                                        height: 'auto'
                                    }}
                                />
                                <h6
                                    style={{
                                        whiteSpace: 'nowrap', // Prevents text from wrapping
                                        overflow: 'hidden', // Hide overflowing text
                                        textOverflow: 'ellipsis' // Display ellipsis for long text
                                    }}
                                >{product.name}</h6>
                                <h4>${product.price.toFixed(2)}</h4>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Products