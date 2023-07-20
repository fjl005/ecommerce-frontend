import { Container, Row, Col, Button } from "reactstrap";
import NavbarApp from '../components/NavbarApp';
import { useState, useEffect } from "react";
import axios from 'axios';
import SpinningIcon from "../components/SpinningIcon";

const HomePage = ({ username }) => {
    /* Remember that for object destructuring, the ({username}) for the props is essentially:
    function(props) {
        const username = props.username
    }
     */

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/', // Update this with your API base URL
        headers: {
            // Retrieve the token from local storage
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: true, // Must include credentials in order to send cookies with Get Request
    });

    useEffect(() => {
        const fetchData = async () => {
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
    }, []);

    const triggerLogout = () => {
        console.log('logging out...');
        const logoutPost = async () => {
            try {
                const response = await axiosWithAuth.post('/users/logout');
                console.log('local storage: ', localStorage.getItem('accessToken'));
                console.log('Backend response: ', response.data);
                setIsLoggedIn(false);
                setLoginErrorMsg(`You have successfully logged out. Thank you for visiting!`);
            } catch (error) {
                console.log('document cookie:', document.cookie)
                setLoginErrorMsg(`It looks like you're not logged in. Please log in to access this page.`);
                console.error(error);
                localStorage.removeItem('accessToken');
                console.log('local storage: ', localStorage.getItem('accessToken'));
            }
        }

        logoutPost();
    }


    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h1>Home Page</h1>
                            {isLoggedIn && (<Button className='bg-primary' onClick={triggerLogout}>Logout</Button>)}
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {isLoggedIn === null ? (
                            <SpinningIcon />
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