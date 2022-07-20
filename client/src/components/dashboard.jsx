import React from "react";
import { Link } from 'react-router-dom';

function UserDash () {
    return (
        <div>
            <h1>Welcome User!</h1>
            <h3>Your Upcoming Events</h3>
            <div>
                <p>Event 1</p>
                <p>10:00pm Thursday August 11, 2022</p>
                <p># RSVPs</p>
            </div>
            <div>
                <p>Event 2</p>
                <p>10:00pm Friday August 12, 2022</p>
                <p># RSVPs</p>
            </div>
            <div>
                <p>We'll have to inline block these to line them up obviously but sorry if they look confusing right now</p>
            </div>
            <Link to='/create-event'>
                <button>Create New Event</button>
            </Link>
        </div>
    )
}

export default UserDash;