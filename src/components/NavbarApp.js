import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavbarApp = () => {
    return (
        <Navbar color="light" light expand="md">
            <Container>
                <div className='d-flex flex-row'>
                    <NavbarBrand href="/">
                        Home Page
                    </NavbarBrand>
                    <Nav className="d-flex flex-row" navbar>
                        <NavItem className='mr-3'>
                            <NavLink tag={Link} to="/login" style={{ marginTop: '1px' }}>
                                Login
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Container>
        </Navbar>
    )
}

export default NavbarApp;