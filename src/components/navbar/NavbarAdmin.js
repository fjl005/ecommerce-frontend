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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../../contexts/LoginContext';
import adminNavbarBrand from '../../img/adminNavbarBrand.png';
import ProfileButtonToggle from './ProfileButtonToggle';
import { NAV_TITLE } from './navbarPageTitles';


const NavbarAdmin = ({ currentPage }) => {
    const { admin } = useLoginContext();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const pageSelectedBackground = (navText) => {
        return currentPage === navText ? 'selected-navbar-background-admin' : 'navbar-hover-admin';
    }

    const pageSelectedText = (navText) => {
        return currentPage === navText ? 'black-text' : 'white-text';
    }

    return (
        <>
            {admin && (
                <Navbar color='dark' expand="md">
                    <Container className='d-flex flex-row align-items-center justify-content-between'>
                        <div className='d-flex flex-row align-items-center'>
                            <NavbarBrand tag={Link} to="/admin">
                                <img
                                    src={adminNavbarBrand}
                                    alt="Fetsy Admin Navbar Logo"
                                    className='navbar-brand-width'
                                />
                            </NavbarBrand>
                            <NavbarToggler onClick={toggleNavbar} style={{ backgroundColor: 'white' }} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className='ml-auto'>
                                    {NAV_TITLE.adminPages.map((navText, idx) => (
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
                                    ))}
                                </Nav>
                            </Collapse>
                        </div>

                        <Nav>
                            <div className='d-flex align-items-center'>
                                <NavItem>
                                    <NavLink tag={Link} to="/">
                                        <Button className='bg-light' style={{ color: 'black' }}>User</Button>
                                    </NavLink>
                                </NavItem>

                                <ProfileButtonToggle />
                            </div>
                        </Nav>
                    </Container>
                </Navbar>
            )}
        </>
    )
};

export default NavbarAdmin;