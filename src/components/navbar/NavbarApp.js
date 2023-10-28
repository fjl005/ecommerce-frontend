import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarToggler,
    Collapse
} from 'reactstrap';
import NavbarSearch from './NavbarSearch';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLoginContext } from '../login/LoginContext';
import { useCartContext } from '../cart/CartContext';
import fetsyNavbarBrand from '../../img/fetsyNavbarBrand.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


const NavbarApp = ({ isCheckout, currentPage, }) => {
    // CONTEXTS
    const {
        cartLength,
        setCartLength,
        setSavedLength
    } = useCartContext();

    const {
        loggedIn,
        showLoginButton,
        triggerLogout,
        admin
    } = useLoginContext();

    // NAVBAR TOGGLE
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    // Nav Items that appear once signed in (to the left of the search bar)
    const signedInNavItems = ['Orders', 'Favorites', 'Reviews'];



    return (
        <Navbar color="light" light expand="lg">
            <Container className='d-flex align-items-center'>
                <NavbarToggler onClick={toggleNavbar} style={{ marginRight: '20px' }} />
                <NavbarBrand tag={Link} to="/" >
                    <img
                        src={fetsyNavbarBrand}
                        alt="Fetsy Navbar Logo"
                        style={{
                            width: '100px',
                            height: 'auto',
                        }}
                    />
                </NavbarBrand>

                {isCheckout ? (
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={Link} to={`/cart`}>
                                Back to Cart
                            </NavLink>
                        </NavItem>
                    </Nav>
                ) : (
                    <>
                        <Collapse isOpen={isOpen} navbar>
                            <Nav navbar>
                                {loggedIn &&
                                    signedInNavItems.map((navText, idx) => (
                                        <NavItem
                                            key={idx}
                                            className={currentPage === navText ? 'selected-navbar-background' : 'navbar-hover'}
                                        >
                                            <NavLink tag={Link} to={`/${navText}`}
                                                style={{
                                                    color: currentPage === navText ? 'white' : 'black'
                                                }}
                                            >
                                                {navText}
                                            </NavLink>
                                        </NavItem>
                                    ))
                                }

                                {/* Signup will appear whether you're logged in or not. */}
                                <NavItem
                                    className={currentPage === 'Signup' ? 'selected-navbar-background' : 'navbar-hover'}
                                >
                                    <NavLink tag={Link} to="/signup"
                                        style={{
                                            whiteSpace: 'nowrap',
                                            color: currentPage === 'Signup' ? 'white' : 'black'
                                        }}
                                    >
                                        Sign Up
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>

                        <div style={{ width: '100%', margin: '0px 25px' }}>
                            <NavbarSearch />
                        </div>

                        <Nav navbar
                            className='d-flex align-items-center justify-content-between'
                        >
                            {!loggedIn ? (
                                <NavItem>
                                    <NavLink tag={Link} to='/login'>
                                        Login
                                    </NavLink>
                                </NavItem>
                            ) : (
                                <>
                                    <NavItem
                                        className={currentPage === 'Cart' ? 'selected-navbar-background-cart' : 'navbar-hover'}
                                        style={{ marginRight: '20px' }}
                                    >
                                        <NavLink tag={Link} to="/cart"
                                            style={{
                                                position: 'relative',
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCartShopping}
                                                style={{
                                                    fontSize: '35px',
                                                    padding: '5px',
                                                }}
                                            />

                                            {cartLength > 0 && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 0,
                                                        width: '25px',
                                                        height: '25px',
                                                        backgroundColor: 'red',
                                                        borderRadius: '50%',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '15px',
                                                            fontWeight: 'bold',
                                                            color: 'white',
                                                            width: '100%',
                                                            height: '100%',
                                                        }}
                                                    >
                                                        {cartLength}
                                                    </span>
                                                </div>
                                            )}
                                        </NavLink>
                                    </NavItem>

                                    <Collapse isOpen={isOpen} navbar>
                                        {admin && (
                                            <NavItem style={{ marginRight: '20px' }}>
                                                <NavLink tag={Link} to="/admin">
                                                    <Button>Admin</Button>
                                                </NavLink>
                                            </NavItem>
                                        )}

                                        <NavItem>
                                            {showLoginButton && (
                                                <UncontrolledDropdown>
                                                    <DropdownToggle color='primary' caret>
                                                        Profile
                                                    </DropdownToggle>

                                                    <DropdownMenu>
                                                        <DropdownItem tag={Link} to='/profilesettings'>
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
                                            )}
                                        </NavItem>
                                    </Collapse>
                                </>
                            )}
                        </Nav>
                    </>
                )}
            </Container>
        </Navbar>
    );
};

export default NavbarApp;