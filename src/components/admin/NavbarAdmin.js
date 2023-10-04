import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../login/LoginContext';
import LoadingOverlay from '../miscellaneous/LoadingOverlay';
import { useCartContext } from '../cart/CartContext';


const NavbarAdmin = () => {
    const { loggedIn, showLoginButton, triggerLogout, admin } = useLoginContext();
    const { cartLength, setCartLength, setSavedLength } = useCartContext();

    return (

        <Navbar color='dark' expand="md">
            <Container
                className='d-flex flex-row align-items-center justify-content-between'
                style={{ height: '60px', }}
            >
                <div className='d-flex flex-row align-items-center'>
                    <NavbarBrand tag={Link} to="/admin" style={{ color: 'white' }}>
                        Fetsy Admin
                    </NavbarBrand>

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
                            <NavLink style={{ color: 'white' }}>
                                Add Sale
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={{ color: 'white' }}>
                                Billing
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={{ color: 'white' }}>
                                Shop Settings
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>

                <Nav>
                    <div className='d-flex align-items-center'>
                        {admin && (
                            <NavItem>
                                <NavLink tag={Link} to="/">
                                    <Button>User</Button>
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

        </Navbar >
    )
}

export default NavbarAdmin