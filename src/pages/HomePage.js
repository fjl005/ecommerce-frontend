import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import NavbarApp from '../components/NavbarApp';
import { useState, useEffect } from "react";
import axios from 'axios';

const HomePage = ({ username }) => {
    /* Remember that for object destructuring, the ({username}) for the props is essentially:
    function(props) {
        const username = props.username
    }
     */

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            // Create an instance of axios with a default Authorization header
            const axiosWithAuth = axios.create({
                baseURL: 'http://localhost:5000/', // Update this with your API base URL
                headers: {
                    // Retrieve the token from local storage
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                withCredentials: true, // Include credentials (cookies) in requests
            });

            try {
                const response = await axiosWithAuth.get('/users');
                console.log('local storage: ', localStorage.getItem('accessToken'));
                console.log('Backend response: ', response.data);
                setIsLoggedIn(true);
            } catch (error) {
                console.log('document cookie:', document.cookie)
                setIsLoggedIn(false);
                setLoginErrorMsg(`It looks like you're not logged in. Please log in to access this page.`);
                console.error(error);
                localStorage.removeItem('accessToken');
                console.log('local storage: ', localStorage.getItem('accessToken'));
            }
        }
        fetchData();
    }, [])


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
                        {isLoggedIn === null ? (
                            <h3>Checking if you are logged in...</h3>
                        ) : isLoggedIn ? (
                            <h4>Nice, you are logged in now! </h4>
                        ) : (
                            <p>{loginErrorMsg}</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default HomePage