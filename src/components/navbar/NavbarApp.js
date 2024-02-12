import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Button,
    NavbarToggler,
    Collapse
} from 'reactstrap';
import NavbarSearch from './NavbarSearch';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLoginContext } from '../../contexts/LoginContext';
import { useCartContext } from '../../contexts/CartContext';
import fetsyNavbarBrand from '../../img/fetsyNavbarBrand.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NAV_TITLE } from './navbarPageTitles';
import ProfileButtonToggle from './ProfileButtonToggle';


const NavbarApp = ({ isCheckout, currentPage, }) => {

    const { cartLength } = useCartContext();
    const { loggedIn, admin } = useLoginContext();

    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const pageSelectedBackground = (navText) => {
        return currentPage === navText ? 'selected-navbar-background' : 'navbar-hover';
    }

    const pageSelectedText = (navText) => {
        return currentPage === navText ? 'white-text' : 'black-text';
    }

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

                {isCheckout ? (
                    <Nav navbar>
                        <NavItem>
                            <NavLink
                                tag={Link}
                                to={`/cart`}
                                className='navbar-hover'
                            >
                                Back to Cart
                            </NavLink>
                        </NavItem>
                    </Nav>
                ) : (
                    <>
                        <NavbarToggler onClick={toggleNavbar} className='mr-3' />

                        <Collapse isOpen={isOpen} navbar>
                            <Nav navbar className='ml-3 mr-3'>
                                {loggedIn ?
                                    NAV_TITLE.loggedIn.map((navText, idx) => (
                                        <NavItem
                                            key={idx}
                                            className={pageSelectedBackground(navText.title)}
                                        >
                                            <NavLink
                                                tag={Link}
                                                to={navText.link}
                                                className={pageSelectedText(navText.title)}
                                            >
                                                {navText.title}
                                            </NavLink>
                                        </NavItem>
                                    )) : (
                                        <NavItem className={pageSelectedBackground(NAV_TITLE.signup.title)}>
                                            <NavLink
                                                tag={Link}
                                                to={NAV_TITLE.signup.link}
                                                className={pageSelectedText(NAV_TITLE.signup.title)}
                                                style={{ whiteSpace: 'nowrap' }}
                                            >
                                                {NAV_TITLE.signup.title}
                                            </NavLink>
                                        </NavItem>
                                    )
                                }

                                <NavItem className={pageSelectedBackground(NAV_TITLE.about.title)}>
                                    <NavLink
                                        tag={Link}
                                        to={NAV_TITLE.about.link}
                                        style={{ whiteSpace: 'nowrap' }}
                                        className={pageSelectedText(NAV_TITLE.about.title)}
                                    >
                                        {NAV_TITLE.about.title}
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>

                        {!isOpen && (
                            <div className='w-100 mr-3'>
                                <NavbarSearch />
                            </div>
                        )}

                        <Nav navbar className='d-flex align-items-center justify-content-between'>
                            {!loggedIn ? (
                                <NavItem className={pageSelectedBackground(NAV_TITLE.login.title)}>
                                    <NavLink
                                        tag={Link}
                                        to={NAV_TITLE.login.link}
                                        className={pageSelectedText(NAV_TITLE.login.title)}
                                    >
                                        {NAV_TITLE.login.title}
                                    </NavLink>
                                </NavItem>
                            ) : (
                                <>
                                    <NavItem className={currentPage === NAV_TITLE.cart.title ? 'selected-navbar-background-cart' : 'navbar-hover'}>
                                        <NavLink
                                            tag={Link}
                                            to={NAV_TITLE.cart.link}
                                            style={{ position: 'relative' }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCartShopping}
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
                                            <NavItem className='ml-3'>
                                                <NavLink
                                                    tag={Link}
                                                    to={NAV_TITLE.admin.link}
                                                >
                                                    <Button className='bg-dark btn-border-none'>
                                                        {NAV_TITLE.admin.title}
                                                    </Button>
                                                </NavLink>
                                            </NavItem>
                                        )}

                                        <ProfileButtonToggle />
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