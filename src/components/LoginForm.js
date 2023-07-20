import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginForm = ({ username, setUsername }) => {
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const endpoint = 'http://localhost:5000/users/login'

        try {
            const response = await axios.post(endpoint, {
                username,
                password
            }, {
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            );

            console.log('Backend response: ', response.data);
            const { accessToken, sessionId } = response.data
            // Store the token in local storage
            localStorage.setItem('accessToken', accessToken);

            // Store the session id in the cookie
            document.cookie = `connect.sid=${sessionId}`
            setIsLoggedIn(true);
        } catch (error) {
            setIsLoggedIn(false);
            console.error(error);
            if (error.response.status === 401) {
                setLoginErrorMsg('Your username or password is incorrect');
            }
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>Login</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
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
                            <Button type='submit' color='primary'>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <Container style={{ marginTop: '20px' }}>
                <Row>
                    <Col>
                        {isLoggedIn ? (
                            <>
                                <h4>Nice, you are logged in now! </h4>
                                <p>Username: {username}</p>
                                <Link to='/'>
                                    Click here to go back to the Home Page
                                </Link>
                            </>
                        ) : (
                            <p>{loginErrorMsg}</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginForm;