import { Container, Navbar, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom";

const NavBar = () =>{
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
            <Container>
                <Navbar.Brand>Ads.app</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link to="/" as={NavLink}>
                            Home
                        </Nav.Link>
                        <Nav.Link to="/logout" as={NavLink}>
                            Sign out
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;