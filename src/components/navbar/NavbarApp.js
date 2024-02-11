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
import { useLoginContext } from '../../contexts/LoginContext';
import { useCartContext } from '../../contexts/CartContext';
import { useSavedItemContext } from '../../contexts/SavedItemContext';
import fetsyNavbarBrand from '../../img/fetsyNavbarBrand.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


const NavbarApp = ({ isCheckout, currentPage, }) => {

    const { cartLength, setCartLength, } = useCartContext();
    const { setSavedLength } = useSavedItemContext();
    const {
        loggedIn,
        triggerLogout,
        admin
    } = useLoginContext();

    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const signedInNavItems = ['Orders', 'Favorites', 'Reviews'];

    return (
        <Navbar color="light" light expand="lg">
            <Container className='d-flex align-items-center'>
                <NavbarBrand tag={Link} to="/" >
                    <img
                        src={fetsyNavbarBrand}
                        alt="Fetsy Navbar Logo"
                        className='navbar-brand-width'
                    />
                </NavbarBrand>

                <NavbarToggler onClick={toggleNavbar} className='mr-3' />

                {isCheckout ? (
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={Link} to={`/cart`} className='navbar-hover'>
                                Back to Cart
                            </NavLink>
                        </NavItem>
                    </Nav>
                ) : (
                    <>
                        <Collapse isOpen={isOpen} navbar>
                            <Nav navbar className='ml-3 mr-3'>
                                {loggedIn ?
                                    signedInNavItems.map((navText, idx) => (
                                        <NavItem
                                            key={idx}
                                            className={
                                                currentPage === navText
                                                    ? 'selected-navbar-background'
                                                    : 'navbar-hover'
                                            }
                                        >
                                            <NavLink tag={Link} to={`/${navText}`}
                                                style={{
                                                    color: currentPage === navText ? 'white' : 'black'
                                                }}
                                            >
                                                {navText}
                                            </NavLink>
                                        </NavItem>
                                    )) : (
                                        <NavItem
                                            className={
                                                currentPage === 'Signup'
                                                    ? 'selected-navbar-background'
                                                    : 'navbar-hover'
                                            }
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
                                    )
                                }

                                <NavItem
                                    className={
                                        currentPage === 'About'
                                            ? 'selected-navbar-background'
                                            : 'navbar-hover'
                                    }
                                >
                                    <NavLink tag={Link} to="/about"
                                        style={{
                                            whiteSpace: 'nowrap',
                                            color: currentPage === 'About' ? 'white' : 'black'
                                        }}
                                    >
                                        About
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>

                        {!isOpen && (
                            <div className='w-100' style={{ margin: '0 2rem' }}>
                                <NavbarSearch />
                            </div>
                        )}
                        {/* </Collapse> */}


                        {/* <Collapse isOpen={isOpen} navbar> */}

                        <Nav navbar className='d-flex align-items-center justify-content-between'>
                            {!loggedIn ? (
                                <NavItem className={
                                    currentPage === 'Login'
                                        ? 'selected-navbar-background'
                                        : 'navbar-hover'
                                }>
                                    <NavLink
                                        tag={Link} to='/login'
                                        style={{ color: currentPage === 'Login' ? 'white' : 'black' }}
                                    >
                                        Login
                                    </NavLink>
                                </NavItem>
                            ) : (
                                <>
                                    <NavItem
                                        className={
                                            currentPage === 'Cart'
                                                ? 'selected-navbar-background-cart'
                                                : 'navbar-hover'
                                        }
                                    // style={{ marginRight: '2rem' }}
                                    >
                                        <NavLink tag={Link} to="/cart"
                                            style={{ position: 'relative' }}
                                        >
                                            <FontAwesomeIcon icon={faCartShopping}
                                                style={{ fontSize: '2rem', padding: '0.25rem', marginRight: '0' }}
                                            />

                                            {cartLength > 0 && (
                                                <div className='navbar-cart-red-circle'>
                                                    <span className='navbar-cart-white-num w-100 h-100'>
                                                        {cartLength}
                                                    </span>
                                                </div>
                                            )}
                                        </NavLink>
                                    </NavItem>

                                    <Collapse isOpen={isOpen} navbar>
                                        {admin && (
                                            <NavItem style={{ marginLeft: '2rem' }}>
                                                <NavLink tag={Link} to="/admin">
                                                    <Button className='bg-dark btn-border-none'>
                                                        Admin
                                                    </Button>
                                                </NavLink>
                                            </NavItem>
                                        )}

                                        <NavItem>
                                            {loggedIn && (
                                                <UncontrolledDropdown style={{ marginLeft: '2rem' }}>
                                                    <DropdownToggle color='primary' className='btn-border-none' caret>
                                                        Profile
                                                    </DropdownToggle>

                                                    <DropdownMenu>
                                                        <DropdownItem tag={Link} to='/profilesettings'>
                                                            Settings
                                                        </DropdownItem>

                                                        <DropdownItem tag={Link} to='/signup'>
                                                            Make a New Account
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
                        {/* </Collapse> */}
                    </>
                )}
            </Container>
        </Navbar>
    );
};

export default NavbarApp;