import { Container, Row, Col } from "reactstrap";
import NavbarApp from "../components/miscellaneous/NavbarApp";
import { useCartContext } from "../components/cart/CartContext";

const Favorites = () => {
    const { cartLength } = useCartContext();

    return (
        <>
            <NavbarApp cartLength={cartLength} />
            <Container>
                <Row>
                    <Col>
                        <h1>Favorites</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Favorites