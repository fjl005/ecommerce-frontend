import { Container, Row, Col } from "reactstrap";
import { Button } from "reactstrap";
import ProductChecklistView from "../products/ProductChecklistView";
import { formatDate } from "../miscellaneous/formatDate";

const ItemsInOrder = ({ order, orderId, adminPage, buyer }) => {

    return (
        <Container className='cart-container'>
            <Row>
                <Col style={{ marginTop: '10px' }} xs='12' md='10'>
                    <h4 className='my-auto'>
                        Order placed on: {formatDate(new Date(order.orderDate))}
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    {buyer && (
                        <h5>
                            Purchased by: {buyer}
                        </h5>
                    )}
                </Col>

            </Row>
            {
                order.items.map((purchasedItem, idx) => (
                    <ProductChecklistView
                        key={idx}
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