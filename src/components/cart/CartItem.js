import { Container, Row, Col } from "reactstrap";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';


const CartItem = () => {
    return (
        <Container className='cart-container'>
            <Row>
                <Col>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3>Fetsy</h3>
                        <h5>Contact Seller</h5>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg='3'>
                    <img
                        src={twoPageAirbnb}
                        alt='alt text'
                        style={{
                            width: '100%',
                            marginBottom: '20px'
                        }}
                    />
                </Col>
                <Col lg='6'>
                    <div className='d-flex flex-column'>
                        <h3>Two Page Airbnb Template</h3>
                        <div style={{
                            backgroundColor: 'rgb(240, 240, 240)',
                            width: '75%',
                            borderRadius: '10px',
                            padding: '20px 10px',
                        }}>
                            <p>
                                <div className='icon-margin-align'>
                                    <i class="fa-solid fa-cloud-arrow-down"></i>
                                </div>
                                Instant Download

                            </p>
                            <p>
                                <div className='icon-margin-align'>
                                    <i class="fa-solid fa-paperclip"></i>
                                </div>
                                1 PDF Included
                            </p>
                        </div>
                    </div>
                </Col>
                <Col lg='3' style={{ textAlign: 'right' }}>
                    <h3>$4.50</h3>
                </Col>
            </Row>
            <Row>
                <Col style={{ marginBottom: '10px' }}>
                    <span className='cart-remove-save-btn'>
                        <i class="fa-solid fa-x" style={{ marginRight: '10px' }}></i>
                        Remove
                    </span>
                    <span className='cart-remove-save-btn' style={{ marginLeft: '10px' }}>Save for later</span>
                </Col>
            </Row>
        </Container>
    )
}

export default CartItem