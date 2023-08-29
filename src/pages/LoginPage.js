// import LoginForm from '../components/login/LoginForm';
import NavbarApp from '../components/navbar/NavbarApp';
import { useCartContext } from "../components/cart/CartContext";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../components/login/LoginContext';


const LoginPage = () => {
    const {
        cartLength,
        setCartLength,
        setSavedLength } = useCartContext();

    const {
        loggedIn,
        setLoggedIn,
        triggerLogoutSign,
        loginMsg,
        setLoginMsg,
        setUsername,
        username,
        setAdmin } = useLoginContext();

    // Login states
    const [password, setPassword] = useState('');
    // const [loginMsg, setLoginMsg] = useState('');
    const [initialRender, setInitialRender] = useState(true);

    // Axios configuration. Need credentials to send cookies.
    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = 'http://localhost:5000/users/login';
        try {
            const response = await axiosWithAuth.post(endpoint, {
                username,
                password
            });
            console.log('response: ', response);
            const data = response.data.user;
            setCartLength(data.cart.length);

            setLoggedIn(true);
            setAdmin(response.data.user.admin);
            setUsername(response.data.user.username);
        } catch (error) {
            setLoggedIn(false);
            console.log(error);
            if (error.code === 'ERR_NETWORK') {
                return setLoginMsg('Sorry, there is a problem with our server.');
            }
            if (error.response && error.response.data === "Invalid username or password") {
                return setLoginMsg('Your username or password is incorrect');
            }
        }
    };

    // const triggerLogout = () => {
    //     const logoutPost = async () => {
    //         try {
    //             await axiosWithAuth.post('/users/logout');
    //             setLoggedIn(false);
    //             setCartLength(0);
    //             setSavedLength(0);
    //             setLoginMsg(`You have successfully logged out. Thank you for visiting!`);
    //         } catch (error) {
    //             setLoginMsg(`It looks like you're not logged in. Please log in to access this page.`);
    //         }
    //     }
    //     logoutPost();
    // };

    // useEffect(() => {
    //     if (!initialRender) {
    //         if (!loggedIn && triggerLogoutSign) {
    //             triggerLogout();
    //         }
    //     }
    //     setInitialRender(false);
    // }, [loggedIn])

    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <Col>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h1>Login Page</h1>
                            </div>
                        </Col>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {loggedIn ? (
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
                                <p>{loginMsg}</p>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginPage;