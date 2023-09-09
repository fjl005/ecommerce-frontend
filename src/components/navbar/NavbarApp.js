import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import NavbarSearch from './NavbarSearch';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLoginContext } from '../login/LoginContext';
import LoadingOverlay from '../miscellaneous/LoadingOverlay';
import { useCartContext } from '../cart/CartContext';

const NavbarApp = ({ isCheckout }) => {
    const { cartLength, setCartLength, setSavedLength } = useCartContext();
    const { loggedIn, showLoginButton, triggerLogout } = useLoginContext();

    return (
        <Navbar color="light" light expand="md">
            <Container
                className='d-flex flex-row align-items-center justify-content-between'
                style={{ height: '60px', }}
            >
                <div className='d-flex flex-row align-items-center'>
                    <NavbarBrand tag={Link} to="/" className='d-flex align-items-start'>
                        Fetsy
                    </NavbarBrand>

                    {!isCheckout && (
                        <Nav navbar>
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
                            <NavItem>
                                <NavLink tag={Link} to="/reviews" style={{ marginTop: '1px' }}>
                                    Reviews
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/signup" style={{ marginTop: '1px', whiteSpace: 'nowrap' }}>
                                    Sign Up
                                </NavLink>
                            </NavItem>


                        </Nav>
                    )}
                </div>

                {!isCheckout && (
                    <div style={{ width: '100%', margin: '0px 25px' }}>
                        <NavbarSearch />
                    </div>
                )}

                {!isCheckout && (
                    <Nav navbar
                        className='d-flex align-items-center justify-content-between'
                    >


                        <NavItem style={{ marginRight: '20px' }}>
                            <NavLink tag={Link} to="/cart" >
                                <i
                                    class="fa-solid fa-cart-shopping"
                                    style={{
                                        fontSize: '35px',
                                        position: 'relative',
                                        padding: '5px',
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

                        <NavItem>
                            {showLoginButton && (
                                loggedIn ? (
                                    <UncontrolledDropdown>
                                        <DropdownToggle color='primary' caret>
                                            Profile
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem
                                                tag={Link}
                                                to='/profilesettings'
                                            >
                                                Settings
                                            </DropdownItem>
                                            <DropdownItem tag={Link} to='/login'
                                                onClick={() => {
                                                    triggerLogout();
                                                    setCartLength(0);
                                                    setSavedLength(0);
                                                }}
                                            >
                                                Logout
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                ) : (
                                    <NavLink tag={Link} to='/login' style={{ marginTop: '1px' }}>
                                        Login
                                    </NavLink>
                                )
                            )}
                        </NavItem>
                    </Nav>
                )
                }

            </Container >
        </Navbar >
    )
}

export default NavbarApp;