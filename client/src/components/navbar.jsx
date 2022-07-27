import React from "react";
import { Link } from 'react-router-dom';
import Auth from "../utils/auth";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Nav () {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }
    return (
        <>
            <Navbar bg='light'>
                <Container>
                    <Navbar.Brand href=''>
                        <img src='' width='30' height='30' className='d-inline-block align-top' alt='Gathr logo' />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className='justify-content-end'>
                        <Navbar.Text><a href='#dashboard'>User name's Events</a></Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        <header>
            <div>
                <Link to='/'>
                    <h1>Gathr</h1>
                </Link>

<<<<<<< HEAD
                    <Link to='/login'>Login</Link>
                
                    <Link to='/signup'>Signup</Link>
                
=======
                <nav>
                    {Auth.loggedIn() ? (
                        <>
                        <a href='/' onClick={logout}>Logout</a>
                        <Link to='/dashboard'>Dashboard</Link>
                        </>
                    ) : (
                        <>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                        </>
                    )}
                    

                </nav>
            </div>
        </header>
>>>>>>> 3251566f93ad54792bef4d09614374f59f5aa2c5
    )
}

export default Nav;