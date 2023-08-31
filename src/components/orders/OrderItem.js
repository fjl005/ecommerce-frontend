import { Container, Row, Col } from "reactstrap";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';
import { Button } from "reactstrap";
import { Link } from 'react-router-dom';

const OrderItem = ({ order }) => {

    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const downloadClick = (order) => {
        console.log('order from click: ', order);
    };


    return (
        <Container className='cart-container'>
            <Row>
                <Col style={{ marginTop: '10px' }}>
                    <h4>
                        Order placed on: {formatDate(new Date(order.orderDate))}
                    </h4>
                </Col>
            </Row>
            {order.items.map((purchasedItem, idx) => (
                <Row key={idx} style={{ marginBottom: '10px' }}>
                    <Col xs='3'>
                        <img
                            src={twoPageAirbnb}
                            alt={`image for ${purchasedItem.name}`}
                            style={{
                                width: '100%',
                                marginBottom: '20px'
                            }}
                        />
                    </Col>
                    <Col xs='6'>
                        <div className='d-flex flex-column'>
                            <h3 className='product-title'>{purchasedItem.name}</h3>
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
                                    {purchasedItem.productType}
                                </p>
                                <p>
                                    <div className='icon-margin-align'>
                                        <i class="fa-solid fa-paperclip"></i>
                                    </div>
                                    1 PDF Included
                                </p>
                                <span
                                    onClick={() => downloadClick(order)}
                                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Click to Download
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col xs='3' style={{ textAlign: 'right' }}>
                        <div className='d-flex flex-column'>
                            {purchasedItem.price && (
                                <h3>${purchasedItem.price.toFixed(2)}</h3>
                            )}
                            <Link
                                to={{
                                    pathname: `/review/${purchasedItem._id}`,
                                }}
                                state={{ name: purchasedItem.name, productId: purchasedItem.productId }}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black'
                                }}
                            >
                                <Button>Leave a Review</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            ))}
            <Row>
                <Col>
                    <h3>Total Cost: ${order.totalCost.toFixed(2)}</h3>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderItem;