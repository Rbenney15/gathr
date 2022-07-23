import React from "react";
import { Link } from 'react-router-dom';


function HomePage ({updatePage}) {
    return (
        <div>
            <h1 id="home">Welcome to Gathr</h1>
            <p>
                Have you always wanted to host a peanut party?
                Gathr is the place to be! Peanut peanut peanut 
                peanut peanut peanut peanut peanut peanut peanut
                peanut peanut peanut peanut peanut peanut peanut
                peanut peanut peanut peanut peanut peanut peanut
                peanut peanut peanut peanut peanut peanut peanut
                peanut peanut peanut peanut peanut peanut peanut
                peanut peanut peanut peanut peanut peanut peanut
                peanut peanut peanut peanut peanut peanut peanut
                peanut peanut peanut peanut peanut peanut peanut
                peanut peanut peanut peanut peanut peanut peanut
            </p>
            <h3>
                Host, Plan, Gather
            </h3>
            <Link to='/login'>
                <button>Create Event</button>
            </Link>
        </div>
    )
}

export default HomePage;