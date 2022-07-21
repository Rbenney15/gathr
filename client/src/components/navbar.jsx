import React from "react";
import { Link } from 'react-router-dom';
import '../CSS/navbar.css';

function Nav () {
    return (
        <header className="header">
            <div>
                <Link to='/'>
                    <h1>Gathr</h1>
                </Link>

                <nav>
                    <Link className="navbar" to='/login'>Login</Link>
                
                    <Link className="navbar" to='/signup'>Signup</Link>
                </nav>
            </div>
        </header>
    )
}

export default Nav;