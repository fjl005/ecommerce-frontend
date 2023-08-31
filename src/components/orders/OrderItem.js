import { Container, Row, Col } from "reactstrap";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';
import { Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { axiosWithAuth } from "../miscellaneous/axiosWithAuth";

const OrderItem = ({ order, orderId }) => {

    const [starRating, setStarRating] = useState(5);
    const [ratingDescription, setRatingDescription] = useState('');



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
        console.log('order ID: ', orderId);
    };

    useEffect(() => {
        for (const item of order.items) {
            if (item.hasReview) {
                console.log('has review for', item._id.toString());
                fetchReview(item._id.toString());
            }
        }
    }, []);

    const fetchReview = async (purchaseId) => {
        try {
            const response = await axiosWithAuth.get(`/reviews/${purchaseId}`);
            console.log('response: ', response);
            const data = response.data;
            setStarRating(data.starRating);
            setRatingDescription(data.ratingDescription);
        } catch (error) {

        }
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
                                state={{ name: purchasedItem.name, productId: purchasedItem.productId, orderId: orderId }}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black'
                                }}
                            >
                                <Button>Leave a Review</Button>
                            </Link>
                            {purchasedItem.hasReview && (
                                <>
                                    <p>This product has a review.</p>
                                    <p>Rating (out of 5 stars): {starRating} / 5</p>
                                    <p>Rating Description:</p>
                                    <p>{ratingDescription ? ratingDescription : 'blank'}</p>
                                </>
                            )}
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