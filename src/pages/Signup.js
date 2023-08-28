import { Container, Row, Col } from "reactstrap";
import NavbarApp from "../components/navbar/NavbarApp";

const Signup = () => {
    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <h1>Sign up</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default Signup;