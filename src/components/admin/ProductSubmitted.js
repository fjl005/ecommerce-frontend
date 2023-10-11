import NavbarApp from "../navbar/NavbarApp";
import { Container, Row, Col } from "reactstrap";
import { useLoginContext } from "../login/LoginContext";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';

const ProductSubmitted = ({ title, price, productType, description, pictures, productId, itemSelectedIdArr }) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {itemSelectedIdArr ? (
                            <h1>{itemSelectedIdArr.length} products have been updated!</h1>
                        ) : productId ? (
                            <h1>Your product has been updated!</h1>
                        ) : (
                            <h1>Your product has been submitted!</h1>
                        )}
                    </Col>
                </Row>
            </Container>

            <Container className='cart-container' style={{ textAlign: 'center' }}>
                <Row>
                    <Col>
                        <h2>{title}</h2>
                        <h4>${price}</h4>
                        <img src={pictures[0]} style={{ width: '60%' }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: 'rgb(240, 240, 240)', width: '60%', margin: '20px auto 0px auto' }}>
                            <h4>{productType}</h4>
                            <p>{description}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductSubmitted;