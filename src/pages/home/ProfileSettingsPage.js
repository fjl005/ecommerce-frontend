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

const PASSWORD_TYPE = {
    show: 'text',
    hide: 'password',
};

const PASSWORD_BTN_TEXT = {
    show: 'Show Passwords',
    hide: 'Hide Passwords',
}

const ProfileSettingsPage = () => {
    const { username, checkUser, admin } = useLoginContext();

    const [newUsername, setNewUsername] = useState('');
    const [currentPW, setCurrentPW] = useState('');
    const [newPW, setNewPW] = useState('');
    const [reEnterPW, setReEnterPW] = useState('');
    const [passwordType, setPasswordType] = useState(PASSWORD_TYPE.hide);
    const [buttonPWName, setButtonPWName] = useState(PASSWORD_BTN_TEXT.show);


    const newUsernameSubmit = async (event) => {
        event.preventDefault();
        try {
            const test = await axiosWithAuth.get('/users');
            const currUsername = test.data.username;

            const newUsernameLowerCase = newUsername.toLowerCase();

            await axiosWithAuth.post('/users/updateUsername', {
                newUsername: newUsernameLowerCase
            });

            await axiosWithAuth.put('/reviews', {
                currUsername,
                newUsername: newUsernameLowerCase
            });

            await axiosWithAuth.put('/orders/user', {
                currUsername,
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
            await axiosWithAuth.post('/users/updatePassword', {
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
        if (passwordType === PASSWORD_TYPE.hide) {
            setPasswordType(PASSWORD_TYPE.show);
            setButtonPWName(PASSWORD_BTN_TEXT.hide);
        } else {
            setPasswordType(PASSWORD_TYPE.hide);
            setButtonPWName(PASSWORD_BTN_TEXT.show);
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
                        <h3 className='text-center mt-3'>Change Username</h3>
                        <h5 className='fetsy-brand-color'>Current username: {username}</h5>
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
                        <h3 className='text-center mt-3'>Change Password</h3>
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
                        <Col>
                            <h3 className='text-center mt-3'>Delete Account</h3>
                            <p>I would hate to see you go, but I understand if you don't want a part of this anymore. I won't take it personally. Please note that this action cannot be reversed! All information associated with the user will be erased.</p>
                            <Button
                                className='bg-danger border-0'
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