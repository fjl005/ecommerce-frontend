import { Container, Row, Col, Button } from "reactstrap";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';

const Products = () => {
    const productsArray = [
        {
            name: 'Two Page Airbnb Template Long Title Here',
            price: 4.50,
            img: twoPageAirbnb
        },
        {
            name: 'Two Page Airbnb Template',
            price: 4.50,
            img: twoPageAirbnb
        },
        {
            name: 'Two Page Airbnb Template',
            price: 4.50,
            img: twoPageAirbnb
        },
        {
            name: 'Two Page Airbnb Template',
            price: 4.50,
            img: twoPageAirbnb
        },
    ]
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
                        <div style={{
                            width: '100%',
                            padding: '10px 5px'
                        }}>
                            <img
                                src={twoPageAirbnb}
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

                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Products