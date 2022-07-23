import React from "react";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function CreateEvent () {
    if (!Auth.loggedIn()) {
        return (
          <h4>
            You need to be logged in to see this. Use the navigation links above to
            sign up or log in!
          </h4>
        );
    }
    return (
        <div>
            <h2>Create a New Event</h2>
            <form>
                <div>
                    <label for='event-name'>Event name: </label>
                    <input type='text'></input>
                </div>
                <br />
                <div>
                    <label for='event-time'>Event time: </label>
                    <input type='text'></input>
                </div>
                <br />
                <div>
                    <label for='event-desc'>Event description: </label>
                    <input type='text'></input>
                </div>
                <br />
                <div>
                    <label for='items'>Items to bring: </label>
                    <input type='checkbox'></input>
                    <label>Peanuts</label>
                    <input type='checkbox'></input>
                    <label>Peanuts</label>
                    <input type='checkbox'></input>
                    <label>Peanuts</label>
                    <input type='checkbox'></input>
                    <label>Peanuts</label>
                    <input type='checkbox'></input>
                    <label>Peanuts</label>
                </div>
                <Link to="/event:id">
                    <button>Create Event</button>
                </Link>
            </form>
        </div>
    )
}


export default CreateEvent;