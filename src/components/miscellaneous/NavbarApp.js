import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLoginContext } from '../login/LoginContext';
import LoadingOverlay from '../../pages/LoadingOverlay';

const NavbarApp = ({ cartLength, isCheckout }) => {

    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    const { loggedIn, setLoggedIn } = useLoginContext();


    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        try {
            const response = await axiosWithAuth.get('/users');
            if (response) {
                setLoggedIn(true);
            }
        } catch (error) {
            console.log('error: ', error);
            setLoggedIn(false);
        }
    }

    const triggerLogout = async () => {
        try {
            console.log('trigger logout')
            const response = await axiosWithAuth.post('/users/logout');
            if (response) {
                setLoggedIn(false);
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }


    return (
        <Navbar color="light" light expand="md">
            <Container className='d-flex flex-row align-items-center' style={{ height: '60px', position: 'relative' }}>
                <div
                    className='d-flex flex-row align-items-center'
                >
                    <NavbarBrand tag={Link} to="/">
                        Home Page
                    </NavbarBrand>

                    {!isCheckout && (
                        <Nav navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/orders" style={{ marginTop: '1px' }}>
                                    Orders
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    Favorites
                                </NavLink>
                            </NavItem>

                            <NavItem style={{
                                position: 'absolute',
                                top: 0,
                                right: 0
                            }}>
                                {loggedIn ? (
                                    <NavLink tag={Link} to='/login' onClick={() => triggerLogout()}>
                                        <Button className='bg-success'>Logout</Button>
                                    </NavLink>
                                ) : (
                                    <NavLink tag={Link} to='/login'>
                                        <Button className='bg-primary'>Login</Button>
                                    </NavLink>
                                )}
                            </NavItem>

                            <NavItem style={{
                                position: 'absolute',
                                top: 0,
                                right: 100
                            }}>
                                <NavLink tag={Link} to="/cart">
                                    <i
                                        class="fa-solid fa-cart-shopping"
                                        style={{
                                            fontSize: '35px',
                                            position: 'relative',
                                            padding: '5px'
                                        }}
                                    >
                                        {cartLength > 0 && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    top: 0,
                                                    right: 0,
                                                    width: '25px',
                                                    height: '25px',
                                                    backgroundColor: 'red',
                                                    borderRadius: '50%',
                                                    fontSize: '10px'
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '14px',
                                                        color: 'white',
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                >
                                                    {cartLength}
                                                    {console.log('length of cart: ', cartLength)}
                                                </span>
                                            </div>
                                        )}
                                    </i>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    )}

                </div>
            </Container>
        </Navbar>
    )
}

export default NavbarApp;