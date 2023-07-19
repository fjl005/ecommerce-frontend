import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import NavbarApp from '../components/NavbarApp';

const HomePage = ({ username }) => {
    /* Remember that for object destructuring, the ({username}) for the props is essentially:
    function(props) {
        const username = props.username
    }
     */


    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <h1>Home Page</h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {username ? (
                            <h4>Welcome, {username}!</h4>
                        ) : (
                            <>
                                <h4>Welcome, please log in to access this page!</h4>
                                <Link to='/login'>
                                    Login Here
                                </Link>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default HomePage