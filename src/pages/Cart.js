import NavbarApp from "../components/NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useState } from "react";
import twoPageAirbnb from '../img/twoPageAirbnb.png';

const Cart = () => {
    const [numItems, setNumItems] = useState(0);

    return (
        <>
            <NavbarApp cartNumber={numItems} />
            <Container>
                <Row>
                    <Col>
                        {numItems === 0 ? (
                            <h1>Your cart is empty</h1>
                        ) : (
                            <h1>{numItems} in your cart.</h1>
                        )}

                        <Button onClick={() => setNumItems(numItems + 1)}>+1</Button>

                        {numItems > 0 && (
                            <Button onClick={() => setNumItems(numItems - 1)}>-1</Button>
                        )}
                    </Col>
                </Row>
            </Container>

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
                            <div style={{ backgroundColor: 'lightgray', width: '75%' }}>
                                <p>Instant Download</p>
                                <p>1 PDF Included</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg='3' style={{ textAlign: 'right' }}>
                        <h3>$4.50</h3>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginBottom: '10px' }}>
                        <span className='cart-remove-save-btn'>Remove</span>
                        <span className='cart-remove-save-btn' style={{ marginLeft: '10px' }}>Save for later</span>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <h3>Items saved for later</h3>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart