import NavbarApp from "../navbar/NavbarApp";
import { Container, Row, Col } from "reactstrap";
import { useLoginContext } from "../login/LoginContext";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';

const ProductSubmitted = ({ title, price, productType, description }) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>Your product has been submitted!</h1>
                    </Col>
                </Row>
            </Container>

            <Container className='cart-container' style={{ textAlign: 'center' }}>
                <Row>
                    <Col>
                        <h2>{title}</h2>
                        <h4>${price}</h4>
                        <img src={twoPageAirbnb} style={{ width: '60%' }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: 'rgb(240, 240, 240)', width: '60%', margin: '20px auto 0px auto' }}>
                            <p>{productType}</p>
                            <p>{description}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductSubmitted;