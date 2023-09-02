import { Container, Row, Col } from "reactstrap";
import NavbarApp from "../components/navbar/NavbarApp";

const ReviewsPage = () => {
    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <h1>Reviews</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default ReviewsPage;