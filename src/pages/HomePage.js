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
    const [isAdmin, setIsAdmin] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    // Buttons
    const [btnLoginMsg, setBtnLoginMsg] = useState('Press Me');
    const [btnLoginBackgroundColor, setBtnLoginBackgroundColor] = useState('btn-secondary');
    const [btnAdminMsg, setBtnAdminMsg] = useState('Press Me');
    const [btnAdminBackgroundColor, setBtnAdminBackgroundColor] = useState('btn-secondary');

    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/', // Update this with your API base URL
        headers: {
            // Retrieve the token from local storage
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: true, // Must include credentials in order to send cookies with Get Request
    });

    const checkLogin = async () => {
        try {
            await axiosWithAuth.get('/users');
            setIsLoggedIn(true);
        } catch (error) {
            setIsLoggedIn(false);
            setLoginErrorMsg(`It looks like you're not logged in. Please log in to access this page.`);
            console.error(error);
        }
    };

    const checkAdmin = async () => {
        try {
            const response = await axiosWithAuth.post('/users/admin');
            setIsAdmin(true);
        } catch (error) {
            setIsAdmin(false);
            console.log('error: ', error);
        }
    };

    // Initiate checkLogin annd checkAdmin at initial page render.
    useEffect(() => {
        checkLogin();
        checkAdmin();
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
    };


    const buttonLoginPress = async () => {
        try {
            await checkLogin();
            if (isLoggedIn) {
                welcomeUserBtn();
            } else {
                notUserBtn();
            }
        } catch (error) {
            notUserBtn();
        }
    };

    function welcomeUserBtn() {
        setBtnLoginMsg('Logged in');
        setBtnLoginBackgroundColor('bg-primary');
    }

    function notUserBtn() {
        setBtnLoginMsg('Not logged in');
        setBtnLoginBackgroundColor('btn-danger');
    }


    const buttonAdminPress = async () => {
        try {
            await checkAdmin();
            if (isAdmin) {
                welcomeAdminBtn();
            } else {
                notAdminBtn();
            }
        } catch (error) {
            notAdminBtn();
        }
    };

    function welcomeAdminBtn() {
        setBtnAdminMsg('Welcome, admin!');
        setBtnAdminBackgroundColor('bg-primary');
    }

    function notAdminBtn() {
        setBtnAdminMsg('Not admin');
        setBtnAdminBackgroundColor('btn-danger');
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

                <Row>
                    <Col>
                        <h6>The button below should turn blue when you're logged in. Otherwise, it will turn red.</h6>
                        <Button
                            onClick={buttonLoginPress}
                            className={btnLoginBackgroundColor}
                        >{btnLoginMsg}</Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h6>The button below should turn blue when you're the admin. Otherwise, it will turn red.</h6>
                        <Button
                            onClick={buttonAdminPress}
                            className={btnAdminBackgroundColor}
                        >{btnAdminMsg}</Button>
                        {/* <p>Are you the admin? {isAdmin}</p> */}
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default HomePage