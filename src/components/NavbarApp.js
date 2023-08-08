import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavbarApp = ({ cartNumber }) => {
    return (
        <Navbar color="light" light expand="md">
            <Container className='d-flex flex-row align-items-center' style={{ height: '60px', position: 'relative' }}>
                <div
                    className='d-flex flex-row align-items-center'
                >
                    <NavbarBrand tag={Link} to="/">
                        Home Page
                    </NavbarBrand>
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/login" style={{ marginTop: '1px' }}>
                                Login
                            </NavLink>
                        </NavItem>
                        <NavItem style={{
                            position: 'absolute',
                            top: 0,
                            right: 0
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
                                    {cartNumber > 0 && (
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
                                                    display: 'flex', // Set display to flex
                                                    alignItems: 'center', // Center vertically
                                                    justifyContent: 'center', // Center horizontally
                                                    fontSize: '14px',
                                                    color: 'white',
                                                    width: '100%', // Ensure the span takes up full width
                                                    height: '100%', // Ensure the span takes up full height
                                                }}
                                            >
                                                {cartNumber}
                                            </span>
                                        </div>
                                    )}
                                </i>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Container>
        </Navbar>
    )
}

export default NavbarApp;