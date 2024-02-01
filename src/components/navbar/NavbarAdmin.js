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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../login/LoginContext';
import { useCartContext } from '../cart/CartContext';
import adminNavbarBrand from '../../img/adminNavbarBrand.png';


const NavbarAdmin = () => {
    const { loggedIn, showLoginButton, triggerLogout, admin } = useLoginContext();
    const { setCartLength, setSavedLength } = useCartContext();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {admin && (
                <Navbar color='dark' expand="md">
                    <Container className='d-flex flex-row align-items-center justify-content-between'>
                        <div className='d-flex flex-row align-items-center'>
                            <NavbarBrand tag={Link} to="/admin" style={{ color: 'white' }}>
                                <img
                                    src={adminNavbarBrand}
                                    alt="Fetsy Admin Navbar Logo"
                                    style={{ width: '4rem', }}
                                />
                            </NavbarBrand>

                            <NavbarToggler onClick={toggleNavbar} style={{ marginRight: '2rem', backgroundColor: 'white' }} />

                            <Collapse isOpen={isOpen} navbar>

                                <Nav className='ml-auto'>
                                    <NavItem>
                                        <NavLink tag={Link} to="/admin/addnewproduct" style={{ color: 'white' }}>
                                            Add Product
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/admin/editproductspage" style={{ color: 'white' }}>
                                            Edit Products
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/admin/allorders" style={{ color: 'white' }}>
                                            All Orders
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/admin/allreviews" style={{ color: 'white' }}>
                                            All Reviews
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/admin/billing" style={{ color: 'white' }}>
                                            Billing
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>

                        <Nav>
                            <div className='d-flex align-items-center'>
                                {admin && (
                                    <NavItem>
                                        <NavLink tag={Link} to="/">
                                            <Button className='bg-light' style={{ color: 'black' }}>User</Button>
                                        </NavLink>
                                    </NavItem>
                                )}
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
                            </div>

                        </Nav>
                    </Container>
                </Navbar>
            )
            }
        </>
    )
}

export default NavbarAdmin