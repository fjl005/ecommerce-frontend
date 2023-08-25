import NavbarApp from "../miscellaneous/NavbarApp";
import { Container, Row, Col } from "reactstrap";
import { useCartContext } from "../cart/CartContext";

const OrderCompleted = () => {
    const { cartLength, setCartLength } = useCartContext();
    setCartLength(0);

    return (
        <>
            <NavbarApp cartLength={cartLength} />
            <Container>
                <Row>
                    <Col>
                        <h3>Order is complete! </h3>
                        <h5>You can view your order down below and can check it again in the "Orders" Section.</h5>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default OrderCompleted