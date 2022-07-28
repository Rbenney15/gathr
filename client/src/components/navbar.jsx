import React from "react";
import { Link } from 'react-router-dom';
import Auth from "../utils/auth";

import logo from "../logo.png";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function Header () {
    const { data } = useQuery(QUERY_ME);
    const user = data?.me || {};

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }
    return (
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='/'>
                    <img
                        src={logo}
                        height='40'
                        className='d-inline-block align-top'
                        alt='Gathr logo' />
                </Navbar.Brand>
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


//         <header>
//             <div>
//                 <Link to='/'>
//                     <h1>Gathr</h1>
//                 </Link>

//                 <nav>
//                     {Auth.loggedIn() ? (
//                         <>
//                         <a href='/' onClick={logout}>Logout</a>
//                         <Link to='/dashboard'>Dashboard</Link>
//                         </>
//                     ) : (
//                         <>
//                         <Link to='/login'>Login</Link>
//                         <Link to='/signup'>Signup</Link>
//                         </>
//                     )}
                    

//                 </nav>
//             </div>
//         </header>
//     )
// }

export default Header;