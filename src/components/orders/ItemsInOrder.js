import { Container, Row, Col } from "reactstrap";
import ProductSummaryView from "../products/ProductSummaryView";
import { formatDate } from "../miscellaneous/formatDate";

const ItemsInOrder = ({ order, orderId, adminPage, buyer }) => {

    console.log('order: ', order);
    console.log('order ID: ', orderId);
    console.log('order items: ', order.items);

    return (
        <Container className='cart-container'>
            <Row>
                <Col className='m-top-1' xs='12' md='10'>
                    <h4 className='m-top-1'>
                        Order placed on: {formatDate(new Date(order.orderDate))}
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    {buyer && (
                        <h5>Purchased by: {buyer}</h5>
                    )}
                </Col>

            </Row>

            {order.items.map((purchasedItem, idx) => (
                <ProductSummaryView
                    key={idx}
                    idx={idx}
                    productItem={purchasedItem}
                    inOrderJs={true}
                    orderId={orderId}
                    order={order}
                    adminPage={adminPage}
                />
            ))
            }

            <Row>
                <Col>
                    <h3>Total Cost: ${order.totalCost.toFixed(2)}</h3>
                </Col>
            </Row>
        </Container>
    )
}

export default ItemsInOrder;