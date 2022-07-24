import React from "react";
import { Link } from 'react-router-dom';
import Auth from "../utils/auth";

function Nav () {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }
    return (
        <header>
            <div>
                <Link to='/'>
                    <h1>Gathr</h1>
                </Link>

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
    )
}

export default Nav;