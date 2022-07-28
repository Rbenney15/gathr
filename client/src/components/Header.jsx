import React from "react";
import Auth from "../utils/auth";

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>Gathr</Navbar.Brand>
        <Nav className='justify-content-right'>
          {Auth.loggedIn() ? (
            <>
              <Nav.Link href='/dashboard'>My Events</Nav.Link>
              <Button onClick={logout} className='btn btn-primary'>Logout</Button>
            </>
          ) : (
            <>
              <Nav.Link href='/login'>Login</Nav.Link>
              <Nav.Link href='/signup'>Signup</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
