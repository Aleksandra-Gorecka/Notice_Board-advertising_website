import { Container, Navbar, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoggedUser } from "../../../redux/usersRedux";

const NavBar = () =>{

    const loggedUser = useSelector(getLoggedUser);
    console.log(loggedUser);

    return (
        <Navbar bg="dark" data-bs-theme="dark" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
            <Container>
                <Navbar.Brand>Notice Board</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="shadow-none" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link to="/" as={NavLink}>
                            Home
                        </Nav.Link>
                        {!loggedUser && (
                            <>
                                <Nav.Link as={NavLink} to="/login">
						            Login
						        </Nav.Link>
                                <Nav.Link as={NavLink} to="/register">
                                    Register
                                </Nav.Link>
                            </>
                        )}
                        {loggedUser && (
                            <>
                                <Nav.Link to="/ad/add" as={NavLink}>
                                    New Add
                                </Nav.Link>
                                <Nav.Link to="/logout" as={NavLink}>
                                    Sign out
                                </Nav.Link>
                            </>
                        )}
            
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;