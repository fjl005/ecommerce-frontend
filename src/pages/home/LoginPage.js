import NavbarApp from '../../components/navbar/NavbarApp';
import { useCartContext } from "../../contexts/CartContext";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../../contexts/LoginContext';
import { axiosNoAuth, axiosWithAuth } from '../../components/miscellaneous/axios';
import LoginInstructions from '../../components/login/LoginInstructions';
import { NAV_TITLE_MATCH } from '../../components/navbar/navbarPageTitles';

const LoginPage = () => {
    const { setCartLength } = useCartContext();

    const {
        loggedIn,
        setLoggedIn,
        loginMsg,
        setLoginMsg,
        username,
        setUsername,
        password,
        setPassword,
        setAdmin } = useLoginContext();

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const serverCheck = async () => {
            try {
                await axiosNoAuth.get('/');
                console.log('server is live');
            } catch (error) {
                setErrorMsg('Sorry, our server is currently down. Please try again at a later time.');
            }
        }
        serverCheck();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosWithAuth.post('/users/login', {
                username,
                password
            });
            const data = response.data.user;
            setCartLength(data.cart.length);
            setLoggedIn(true);
            setPassword('');
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

    return (
        <>
            <NavbarApp currentPage={NAV_TITLE_MATCH.login} />
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
                                        <Label htmlFor='username'>Username:</Label>
                                        <Input
                                            type='text'
                                            id='username'
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor='password'>Password:</Label>
                                        <Input
                                            type='password'
                                            id='password'
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </FormGroup>
                                    <div className='d-flex'>
                                        <Button type='submit' color='primary'>Login</Button>
                                        <Button
                                            color='danger'
                                            className='ml-3'
                                            onClick={() => {
                                                setUsername('');
                                                setPassword('');
                                            }}
                                        >Clear</Button>
                                    </div>
                                </Form>
                                <p>{loginMsg}</p>
                            </>
                        )}
                        <p style={{ color: 'red' }}>{errorMsg}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <LoginInstructions
                            loginPage={true}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginPage;