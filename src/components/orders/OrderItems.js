import { Container, Row, Col } from "reactstrap";
import ProductSummaryView from "../summaryview/ProductSummaryView";
import { formatDate } from "../miscellaneous/formatDate";


const OrderItems = ({ order, orderId, adminPage, buyer }) => {

    return (
        <Container className='cart-container'>
            <Row>
                <Col>
                    <h4 className='mt-3'>
                        Order placed on: {formatDate(new Date(order.orderDate))}
                    </h4>
                </Col>
            </Row>

            {order.items.map((purchasedItem, idx) => (
                <ProductSummaryView
                    key={idx}
                    idx={idx}
                    purchasedItem={purchasedItem}
                    inOrderJs={true}
                    orderId={orderId}
                    adminPage={adminPage}
                    buyer={buyer}
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

export default OrderItems;