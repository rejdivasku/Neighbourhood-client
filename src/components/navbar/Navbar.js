import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../helpers/AuthContext";
import React, { useState, useContext } from "react";

export function NavbarElement( {logout} ) {

     //const [authState, setAuthState] = useState(false);
     const { authState } = useContext(AuthContext);

     // useEffect(() => {
     //   axios
     //     .get("http://localhost:3001/auth/auth", {
     //       headers: {
     //         accessToken: localStorage.getItem("accessToken"),
     //       },
     //     })
     //     .then((response) => {
     //       if (response.data.error) {
     //         setAuthState(false);
     //       } else {
     //         setAuthState(true);
     //       }
     //     });
     // }, []);

     return (
          <Navbar bg="light" expand="lg" className="navbar sticky-top">
               <Container>
                    <Navbar.Brand href="/">
                         <img src="https://www.pngitem.com/pimgs/m/469-4695820_neighborhood-com-logo-png-transparent-png.png" width="50" height="40" />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                         <Nav.Link href="/">Home</Nav.Link>
                         {!authState.status && (
                              <>
                                   <Nav.Link href="/login">Login</Nav.Link>
                                   <Nav.Link href="/register">Register</Nav.Link>
                              </>
                         )}
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                         {/* <Navbar.Text>
                              <FontAwesomeIcon icon={faUser} /><span style={{ marginLeft: 5 }}>Profile</span>
                         </Navbar.Text> */}
                         <FontAwesomeIcon icon={faUser} style={{ marginRight: 5 }} />
                         <NavDropdown title={authState.username ? authState.username : 'Profile'} id="basic-nav-dropdown">
                              <NavDropdown.Item href="/myDetails/:id" disabled={!authState.username}>My Details</NavDropdown.Item>
                              <NavDropdown.Item href="/register">
                                   Register
                              </NavDropdown.Item>
                              <NavDropdown.Item onClick={logout}> {authState.username ? 'Log Out': 'Log In'} </NavDropdown.Item>
                         </NavDropdown>
                    </Navbar.Collapse>
               </Container>
          </Navbar>
     );
}