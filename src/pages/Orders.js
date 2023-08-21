import NavbarApp from "../components/miscellaneous/NavbarApp";
import { Container, Row, Col } from "reactstrap";

const Orders = ({ cartLength }) => {
    return (
        <>
            <NavbarApp cartLength={cartLength} />
            <Container>
                <Row>
                    <Col>
                        <h1>View Your Orders</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Orders