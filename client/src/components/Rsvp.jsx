import React from 'react';
import { Link } from 'react-router-dom';

function Rsvp () {
    return (
        <div>
            <h2>RSVP To Event</h2>
            <form>
                <div>
                    <label for='guest-name'>Guest name: </label>
                    <input placeholder="Your Name" type='text'></input>
                </div>
                <br />
                <div>
                    <label for='guest-rsvp'>RSVP: </label>
                    <input type='radio' value='Yes'>Yes</input>
                    <input type='radio' value='No'>No</input>
                </div>
                <br />
                <div>
                    <label for='guest-item'>
                        What item will you be bringing?:
                    <textarea />
                    </label>
                </div>
                <Link to='/rsvp'>
                <button>RSVP</button>
                </Link>
            </form>
        </div>
    )
}

export default Rsvp;