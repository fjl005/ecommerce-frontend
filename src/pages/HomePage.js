import { Container, Row, Col, Button } from "reactstrap";
import NavbarApp from '../components/miscellaneous/NavbarApp';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import SpinningIcon from "../components/miscellaneous/SpinningIcon";
import Products from "../components/products/Products";
import { useCartContext } from "../components/cart/CartContext";

const HomePage = ({ username, admin, setAdmin, loggedIn, setLoggedIn, pageLoading, }) => {
    /* Remember that for object destructuring, the ({username}) for the props is essentially:
    function(props) {
        const username = props.username
    }
     */

    const { cartLength } = useCartContext();


    // User States
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    // Button States
    const [btnLoginMsg, setBtnLoginMsg] = useState('Press Me');
    const [btnLoginBackgroundColor, setBtnLoginBackgroundColor] = useState('btn-secondary');
    const [btnAdminMsg, setBtnAdminMsg] = useState('Press Me');
    const [btnAdminBackgroundColor, setBtnAdminBackgroundColor] = useState('btn-secondary');

    // Axios Configuration. Need Credentials to send cookies.
    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    // Async Functions (check login, check admin).
    const checkLogin = async () => {
        try {
            await axiosWithAuth.get('/users');
            setLoggedIn(true);
        } catch (error) {
            console.error(error);
            setLoggedIn(false);
            setLoginErrorMsg(`It looks like you're not logged in. Please log in to access this page.`);
        }
    };

    const checkAdmin = async () => {
        try {
            const response = await axiosWithAuth.post('/users/admin');
            setAdmin(true);
        } catch (error) {
            console.error(error);
            setAdmin(false);
        }
    };

    const triggerLogout = () => {
        const logoutPost = async () => {
            try {
                const response = await axiosWithAuth.post('/users/logout');
                setLoggedIn(false);
                setAdmin(false);
                setLoginErrorMsg(`You have successfully logged out. Thank you for visiting!`);
            } catch (error) {
                console.error(error);
                setLoggedIn(false);
                setAdmin(false);
                setLoginErrorMsg(`It looks like you're not logged in. Please log in to access this page.`);
            }
        }
        logoutPost();
    };


    // Ref to keep track of the timers for buttons (to handle multiple button clicks).
    const loginBtnTimerRef = useRef(null);
    const adminBtnTimerRef = useRef(null);

    // Login Button Press
    const buttonLoginPress = async () => {
        try {
            await checkLogin();
            if (loggedIn) {
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
        clearTimeout(loginBtnTimerRef.current);
        loginBtnTimerRef.current = setTimeout(resetLoginBtnMsg, 1000);
    }

    function notUserBtn() {
        setBtnLoginMsg('Not logged in');
        setBtnLoginBackgroundColor('btn-danger');
        clearTimeout(loginBtnTimerRef.current);
        loginBtnTimerRef.current = setTimeout(resetLoginBtnMsg, 1000);
    }

    const buttonAdminPress = async () => {
        try {
            await checkAdmin();
            if (admin) {
                welcomeAdminBtn();
            } else {
                notAdminBtn();
            }
        } catch (error) {
            notAdminBtn();
        }
    };


    // Admin Button Press
    function welcomeAdminBtn() {
        setBtnAdminMsg('Welcome, admin!');
        setBtnAdminBackgroundColor('bg-primary');
        clearTimeout(adminBtnTimerRef.current);
        adminBtnTimerRef.current = setTimeout(resetAdminBtnMsg, 1000);
    }

    function notAdminBtn() {
        setBtnAdminMsg('Not admin');
        setBtnAdminBackgroundColor('btn-danger');
        clearTimeout(adminBtnTimerRef.current);
        adminBtnTimerRef.current = setTimeout(resetAdminBtnMsg, 1000);
    }


    // Reset Functions 
    const resetLoginBtnMsg = () => {
        setBtnLoginMsg('Press Me');
        setBtnLoginBackgroundColor('btn-secondary');
    };

    const resetAdminBtnMsg = () => {
        setBtnAdminMsg('Press Me');
        setBtnAdminBackgroundColor('btn-secondary');
    };

    return (
        <>
            <NavbarApp cartLength={cartLength} />
            <Container>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h1>Home Page</h1>
                            {loggedIn && (<Button className='bg-primary' onClick={triggerLogout}>Logout</Button>)}
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {pageLoading ? (
                            <SpinningIcon />
                        ) : loggedIn ? (
                            <>
                                <h4>Welcome, {username}</h4>
                                {admin && (
                                    <>
                                        <h1>Special Admin Privilege. Here is your special button: </h1>
                                        <Button>Special Admin Button that does nothing</Button>
                                    </>
                                )}
                            </>
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
                    </Col>
                </Row>
            </Container>

            <Products />
        </>
    )
}

export default HomePage;