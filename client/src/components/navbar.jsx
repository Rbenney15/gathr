import React from "react";
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Nav () {
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

                    <Link to='/login'>Login</Link>
                
                    <Link to='/signup'>Signup</Link>
                
    )
}

export default Nav;