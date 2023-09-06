import { Container, Row, Col, Button } from "reactstrap";
import NavbarApp from "../components/navbar/NavbarApp";
import twoPageAirbnb from '../img/twoPageAirbnb.png';

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

            <Container>
                <Row>
                    <Col>
                        <h2 style={{ textAlign: 'center' }}>Two Page Airbnb Template</h2>
                    </Col>
                </Row>
                <Row>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Col sm='6' style={{ textAlign: 'right' }}>
                            <img
                                src={twoPageAirbnb}
                                alt='alt text'
                                style={{
                                    width: '70%'
                                }}
                            />
                        </Col>
                        <Col sm='6' style={{ marginLeft: '10px' }}>
                            <h5>Review placed on: September 06, 2023 at 10:00AM.</h5>
                            <p>Five Stars</p>
                            <p>Review text</p>
                            <p>Show Full Review (function coming soon).</p>
                            <Button>Edit Review</Button>
                        </Col>
                    </div>
                </Row>
                <Row>
                    <Col style={{ textAlign: 'center' }}>
                        <h4>Product Details</h4>
                        <p>Digital Download</p>
                        <p>1 PDF Included</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default ReviewsPage;