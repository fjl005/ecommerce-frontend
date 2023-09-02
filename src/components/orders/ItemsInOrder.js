import { Container, Row, Col } from "reactstrap";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';
import { Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { axiosWithAuth } from "../miscellaneous/axiosWithAuth";
import ProductChecklistView from "../products/ProductChecklistView";

const OrderItem = ({ order, orderId }) => {

    const [editUrl, setEditUrl] = useState('');

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
                <ProductChecklistView
                    key={idx}
                    productItem={purchasedItem}
                    inOrderJs={true}
                    orderId={orderId}
                    order={order}
                />
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