import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import NavbarApp from "../components/navbar/NavbarApp";
import { axiosWithAuth } from "../components/miscellaneous/axiosWithAuth";

const SignUp = () => {

    const [newUserUsername, setNewUserUsername] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [messageOnScreen, setMessageOnScreen] = useState('');
    const [messageTimeout, setMessageTimeout] = useState('');
    const [setupComplete, setSetupComplete] = useState(false);

    const handleSubmit = async (event) => {

        console.log('submitting');
        event.preventDefault();
        if (messageTimeout) {
            console.log('pre clear: messageTimeout: ', messageTimeout);
            clearTimeout(messageTimeout);
            setMessageTimeout('');
        }

        try {
            await axiosWithAuth.post('/users/signup', {
                username: newUserUsername,
                password: newUserPassword
            });
            setSetupComplete(true);
        } catch (error) {
            console.log('error: ', error);
            setMessageOnScreen(error.response.data);
            const timeoutId = setTimeout(() => setMessageOnScreen(''), 3000);
            setMessageTimeout(timeoutId);
            setTimeout(() => setMessageTimeout(''), 3000);
        }
    }


    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <h1>Sign up</h1>
                    </Col>

                    <Row>
                        <Col>
                            {setupComplete ? (
                                <>
                                    <h3>New user has been created!</h3>
                                    <h6>Username: {newUserUsername}</h6>
                                    <p>You will need to log in with these new credentials. Please click the login page on the top right of the Navigation Bar. Or, if you're already logged in as a different user, please log out first and sign in with the new user information.</p>
                                </>
                            ) : (
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for='username'>Username:</Label>
                                        <Input
                                            type='text'
                                            id='username'
                                            value={newUserUsername}
                                            onChange={(event) => setNewUserUsername(event.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='password'>Password:</Label>
                                        <Input
                                            type='password'
                                            id='password'
                                            value={newUserPassword}
                                            onChange={(event) => setNewUserPassword(event.target.value)}
                                        />
                                    </FormGroup>
                                    <Button type='submit' color='primary'>Sign up</Button>
                                </Form>
                            )}

                        </Col>
                    </Row >

                    <Row>
                        <Col>
                            {messageOnScreen && (
                                <p>{messageOnScreen}</p>
                            )}
                        </Col>
                    </Row>
                </Row >
            </Container >
        </>
    )
};

export default SignUp;