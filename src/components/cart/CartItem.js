import { Container, Row, Col } from "reactstrap";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';


const CartItem = ({ position, removeCartItem, saveLaterCartItem, isSaved, removeSavedItem, moveBackToCart, removeItem }) => {

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
            <Row style={{ marginBottom: '10px' }}>
                <Col xs='3'>
                    <img
                        src={twoPageAirbnb}
                        alt='alt text'
                        style={{
                            width: '100%',
                            marginBottom: '20px'
                        }}
                    />
                </Col>
                <Col xs='6'>
                    <div className='d-flex flex-column'>
                        <h3 className='product-title'>Two Page Airbnb Template</h3>
                        <div style={{
                            backgroundColor: 'rgb(240, 240, 240)',
                            width: '80%',
                            borderRadius: '10px',
                            padding: '10px 5px 0px 5px',
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
                <Col xs='3' style={{ textAlign: 'right' }}>
                    <h3>$4.50</h3>
                </Col>
            </Row>
            <Row>
                <Col style={{ marginBottom: '10px' }}>
                    {isSaved ? (
                        <>
                            <span
                                className='cart-remove-save-btn'
                                onClick={() => removeSavedItem(position)}
                            >
                                <i class="fa-solid fa-x" style={{ marginRight: '10px' }}></i>
                                Remove
                            </span>
                            <span
                                className='cart-remove-save-btn'
                                style={{ marginLeft: '10px' }}
                                onClick={() => moveBackToCart(position)}
                            >
                                <i class="fa-solid fa-cart-plus" style={{ marginRight: '10px' }}></i>
                                Move to Cart
                            </span>
                        </>
                    ) : (
                        <>
                            <span
                                className='cart-remove-save-btn'
                                onClick={() => removeCartItem(position)}
                            >
                                <i class="fa-solid fa-x" style={{ marginRight: '10px' }}></i>
                                Remove
                            </span>
                            <span
                                className='cart-remove-save-btn'
                                style={{ marginLeft: '10px' }}
                                onClick={() => saveLaterCartItem(position)}
                            >
                                Save for later
                            </span>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default CartItem