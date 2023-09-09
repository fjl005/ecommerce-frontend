import NavbarApp from '../components/navbar/NavbarApp';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useLoginContext } from '../components/login/LoginContext';

const ProfileSettingsPage = () => {
    const { username } = useLoginContext();

    const [newUsername, setNewUsername] = useState('');
    const [currentPW, setCurrentPW] = useState('');
    const [newPW, setNewPW] = useState('');
    const [reEnterPW, setReEnterPW] = useState('');

    const [usernameMessage, setUsernameMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');


    const newUsernameSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('new username: ', newUsername);
            console.log('submitted!');
        } catch (error) {
            console.log('newUsernameSubmit error in ProfileSettingsPage.js: ', error);
        }
    }


    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <h1>Profile Settings</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 style={{ textAlign: 'center' }}>Change Username</h3>
                        <h5>Current username: {username}</h5>
                        <Form onSubmit={newUsernameSubmit}>
                            <Label for='newUsername'>New Username:</Label>
                            <Input
                                type='text'
                                id='newUsername'
                                value={newUsername}
                                onChange={(event) => setNewUsername(event.target.value)}
                            />

                            <p>{usernameMessage}</p>
                            <Button type='submit' color='primary'>Save New Username</Button>
                        </Form>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h3 style={{ textAlign: 'center' }}>Change Password</h3>
                        <Form onSubmit={newUsernameSubmit}>
                            <FormGroup>
                                <Label for='currentPW'>Enter Current Password:</Label>
                                <Input
                                    type='password'
                                    id='currentPW'
                                    value={currentPW}
                                    onChange={(event) => setCurrentPW(event.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='newPW'>Enter New Password:</Label>
                                <Input
                                    type='password'
                                    id='newPW'
                                    value={newPW}
                                    onChange={(event) => setNewPW(event.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='reEnterPW'>Enter New Password Again:</Label>
                                <Input
                                    type='password'
                                    id='reEnterPW'
                                    value={reEnterPW}
                                    onChange={(event) => setReEnterPW(event.target.value)}
                                />
                            </FormGroup>
                            <p>{passwordMessage}</p>
                            <Button type='submit' color='primary'>Save New Password</Button>
                        </Form>
                    </Col>
                </Row>

                <Row>
                    <Col style={{ textAlign: 'center' }}>
                        <Button className='bg-danger'>Delete Account</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProfileSettingsPage