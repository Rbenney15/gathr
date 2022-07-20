import React from 'react';
import { Link } from 'react-router-dom';

function Event () {
    return (
        <div>
            <h1>Event.name</h1>
            <Link to=''>
                <button>Update Event</button>
            </Link>
            <div>
                <h2>WHEN</h2>
                <p>event.time</p>
            </div>
            <div>
                <h2>WHERE</h2>
                <p>event.address</p>
            </div>
            <div>
                <h2>WHAT</h2>
                <p>event.description</p>
            </div>
            <div>
                <h2>THINGS WE NEED FOR THE PARTY</h2>
                <ol>
                    <li>Item</li>
                </ol>
            </div>
            <div>
                <h2>WHO IS COMING</h2>
                <ol>
                    <li>attendee.name is bringing Item</li>
                </ol>
            </div>
            <div>
                <h2>STILL WAITING FOR RSVP</h2>
                <ol>
                    <li>attendee.name is bringing Item</li>
                </ol>
            </div>
        </div>
    )
}

export default Event;