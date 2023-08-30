import { Col, Container, Row } from "reactstrap";
import NavbarApp from "../components/navbar/NavbarApp";
import { useParams } from "react-router-dom";

const LeaveReview = () => {
    const { purchaseId } = useParams();

    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <h1>Leave a Review</h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h3>for {purchaseId}</h3>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        Things needed for input regarding review: stars, description,
                    </Col>
                </Row>

                <Row>
                    <Col>
                        Other things needed (not input): username, date, product name, product link
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LeaveReview