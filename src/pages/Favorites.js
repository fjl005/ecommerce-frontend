import { Container, Row, Col } from "reactstrap";
import NavbarApp from "../components/navbar/NavbarApp";
import { useCartContext } from "../components/cart/CartContext";
import { axiosWithAuth } from "../components/miscellaneous/axiosWithAuth";

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