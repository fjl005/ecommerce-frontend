import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLoginContext } from '../login/LoginContext';
import LoadingOverlay from '../../pages/LoadingOverlay';
import { useCartContext } from '../cart/CartContext';

const NavbarApp = ({ isCheckout }) => {
    const { cartLength, setCartLength, setSavedLength } = useCartContext();


    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    const { loggedIn, setLoggedIn, setTriggerLogoutMessage, showLoginButton, triggerLogout } = useLoginContext();

    // const triggerLogout = async () => {
    //     try {
    //         const response = await axiosWithAuth.post('/users/logout');
    //         if (response) {
    //             setLoggedIn(false);
    //             setTriggerLogoutMessage(true);
    //         }
    //     } catch (error) {
    //         console.log('error: ', error);
    //     }
    // }

    console.log('logged in from navbar? ', loggedIn);


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
                        <Nav navbar className='d-flex align-items-center'>
                            <NavItem>
                                <NavLink tag={Link} to="/orders" style={{ marginTop: '1px' }}>
                                    Orders
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/favorites" style={{ marginTop: '1px' }}>
                                    Favorites
                                </NavLink>
                            </NavItem>

                            <NavItem style={{
                                position: 'absolute',
                                top: 5,
                                right: 0
                            }}>
                                {showLoginButton && (
                                    loggedIn ? (
                                        <NavLink
                                            tag={Link}
                                            to='/login'
                                            onClick={() => {
                                                triggerLogout();
                                                setCartLength(0);
                                                setSavedLength(0);
                                            }}>
                                            <Button className='bg-success'>Logout</Button>
                                        </NavLink>
                                    ) : (
                                        <NavLink tag={Link} to='/login' style={{ marginTop: '1px' }}>
                                            Login
                                        </NavLink>
                                    )
                                )}
                            </NavItem>

                            <NavItem style={{
                                position: 'absolute',
                                top: 0,
                                right: loggedIn ? 100 : 50
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