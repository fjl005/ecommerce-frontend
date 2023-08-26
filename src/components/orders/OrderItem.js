import { Container, Row, Col } from "reactstrap";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';


const OrderItemMDB = ({ order }) => {

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
    }

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
                    {console.log('purchased item: ', purchasedItem)}
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
                        {purchasedItem.price && (
                            <h3>${purchasedItem.price.toFixed(2)}</h3>
                        )}
                    </Col>
                </Row>
            ))}
            <Row>
                <Col>
                    <h3>Total Cost: $5.00</h3>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderItemMDB