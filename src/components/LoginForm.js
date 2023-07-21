import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SpinningIcon from './SpinningIcon';

const LoginForm = ({ username, setUsername }) => {
    const [password, setPassword] = useState('');
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
                console.log('Backend response: ', response.data);
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
                console.error(error);
                localStorage.removeItem('accessToken');
                console.log('local storage: ', localStorage.getItem('accessToken'));
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const endpoint = 'http://localhost:5000/users/login';

        try {
            const response = await axios.post(endpoint, {
                username,
                password
            }, {
                credentials: 'include',
            }
            );

            console.log('Backend response: ', response.data);
            const { accessToken, sessionId } = response.data;
            const userId = response.data.user._id;
            // Store the token in local storage
            // localStorage.setItem('accessToken', accessToken);

            // Store the session id in the cookie
            const currentDate = new Date();
            // const expirationDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24)); // Add one day in milliseconds
            const expirationDate = new Date(currentDate.getTime() + (1000 * 15)); // Add 15 seconds in milliseconds
            const expires = `expires=${expirationDate.toUTCString()}`;

            document.cookie = `connect.sid=${sessionId}; ${expires}; userId=${userId}`;
            document.cookie = `userId=${userId}`;
            setIsLoggedIn(true);
        } catch (error) {
            setIsLoggedIn(false);
            console.log(error);
            if (error.code === 'ERR_NETWORK') {
                console.log('waddup');
                return setLoginErrorMsg('Sorry, there is a problem with our server.');
            }
            if (error.response.status === 401) {
                return setLoginErrorMsg('Your username or password is incorrect');
            }
        }
    };

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
    };

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Col>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h1>Login Page</h1>
                                {isLoggedIn && (<Button className='bg-primary' onClick={triggerLogout}>Logout</Button>)}
                            </div>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {isLoggedIn === null ? (
                            <SpinningIcon />
                        ) : isLoggedIn ? (
                            <>
                                <h4>Nice, you are logged in now! </h4>
                                <p>Username: {username}</p>
                                <Link to='/'>
                                    Click here to go back to the Home Page
                                </Link>
                            </>

                        ) : (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for='username'>Username:</Label>
                                        <Input
                                            type='text'
                                            id='username'
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for='password'>Password:</Label>
                                        <Input
                                            type='password'
                                            id='password'
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </FormGroup>
                                    <Button type='submit' color='primary'>Login</Button>
                                </Form>
                                <p>{loginErrorMsg}</p>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>

            <Container style={{ marginTop: '20px' }}>
                <Row>
                    <Col>
                        {/* {isLoggedIn ? (
                            <>
                                <h4>Nice, you are logged in now! </h4>
                                <p>Username: {username}</p>
                                <Link to='/'>
                                    Click here to go back to the Home Page
                                </Link>
                            </>
                        ) : (
                            <p>{loginErrorMsg}</p>
                        )} */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginForm;