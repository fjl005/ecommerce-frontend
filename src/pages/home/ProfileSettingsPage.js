import NavbarApp from '../../components/navbar/NavbarApp';
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { useState } from 'react';
import { useLoginContext } from '../../contexts/LoginContext';
import { axiosWithAuth } from '../../components/miscellaneous/axios';

const ProfileSettingsPage = () => {
    const { username, checkUser, admin } = useLoginContext();

    const [newUsername, setNewUsername] = useState('');
    const [currentPW, setCurrentPW] = useState('');
    const [newPW, setNewPW] = useState('');
    const [reEnterPW, setReEnterPW] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [buttonPWName, setButtonPWName] = useState('Show Passwords');


    const newUsernameSubmit = async (event) => {
        event.preventDefault();
        try {
            const test = await axiosWithAuth.get('/users');
            const currUsername = test.data.username;

            const newUsernameLowerCase = newUsername.toLowerCase();

            await axiosWithAuth.put('/reviews', {
                currUsername,
                newUsername: newUsernameLowerCase
            });

            await axiosWithAuth.post('/users/updateUsername', {
                newUsername: newUsernameLowerCase
            });

            alert('Your username has been updated');
            checkUser();
        } catch (error) {
            console.log('newUsernameSubmit error in ProfileSettingsPage.js: ', error);

            if (error.response && error.response.data === 'Username already exists') {
                alert('Username already exists. Pick a different username');
            } else if (!newUsername) {
                alert('A username must be entered to change username.');
            } else {
                alert('There was an error updating the username. Please try again.');
            }
        }
    };

    const newPasswordSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosWithAuth.post('/users/updatePassword', {
                username,
                password: currentPW,
                newPW,
                reEnterPW
            });
            alert('Your password has been updated');
            checkUser();
        } catch (error) {
            console.log('newPasswordSubmit error in ProfileSettingsPage.js: ', error);

            if (error.response && error.response.data) {
                alert(error.response.data);
            } else {
                alert('There was an error updating the username. Please try again.');
            }
        }
    };

    const updatePasswordType = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            setButtonPWName('Hide Passwords');
        } else {
            setPasswordType('password');
            setButtonPWName('Show Passwords');
        }
    };

    const deleteAccount = async () => {
        if (admin) {
            return alert("The admin account cannot be deleted. Sorry, you're stuck here forever!");
        }
        const userConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (userConfirmed) {
            try {
                const deleteResponse = await axiosWithAuth.delete(`/users/${username}`);
                alert(`Account with username ${username} has been deleted. You will be redirected to the Home Page after this.`);
                await axiosWithAuth.post('/users/logout');
                window.location.href = `/`;
            } catch (error) {
                console.log('Error in deleteAccount() in ProfileSettingsPage.js: ', error);
                alert('There was a problem with deleting this user. Please try again.')
            }
        }
    };


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
                            <FormGroup>
                                <Label for='newUsername'>New Username:</Label>
                                <Input
                                    type='text'
                                    id='newUsername'
                                    value={newUsername}
                                    onChange={(event) => setNewUsername(event.target.value)}
                                />
                            </FormGroup>
                            <Button type='submit' color='primary'>Save New Username</Button>
                        </Form>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h3 className='text-center'>Change Password</h3>
                        <Form onSubmit={newPasswordSubmit}>
                            <FormGroup>
                                <Label for='currentPW'>Enter Current Password:</Label>
                                <Input
                                    type={passwordType}
                                    id='currentPW'
                                    value={currentPW}
                                    onChange={(event) => setCurrentPW(event.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='newPW'>Enter New Password:</Label>
                                <Input
                                    type={passwordType}
                                    id='newPW'
                                    value={newPW}
                                    onChange={(event) => setNewPW(event.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='reEnterPW'>Enter New Password Again:</Label>
                                <Input
                                    type={passwordType}
                                    id='reEnterPW'
                                    value={reEnterPW}
                                    onChange={(event) => setReEnterPW(event.target.value)}
                                />
                            </FormGroup>
                            <Button
                                onClick={() => updatePasswordType()}
                                className='mr-3'
                            >{buttonPWName}</Button>
                            <Button type='submit' color='primary'>Save New Password</Button>
                        </Form>
                    </Col>
                </Row>

                {!admin && (
                    <Row>
                        <Col className='text-center'>
                            <Button
                                className='bg-danger btn-border-none mt-3'
                                onClick={() => deleteAccount()}
                            >Delete Account</Button>
                        </Col>
                    </Row>
                )}

            </Container>
        </>
    )
}

export default ProfileSettingsPage