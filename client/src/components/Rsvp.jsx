import React from "react";
import { Link } from "react-router-dom";

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
                    <form>
                    <label for='guest-rsvp'>Items to bring: </label>
                    <input name='guest-rsvp-yes' type='radio'></input>
                    <label for='guest-rsvp-yes'>Burgers</label>
                    <input name='guest-rsvp-no' type='radio'></input>
                    <label for='guest-rsvp-no'>Buns</label>
                    </form>
                </div>
                <br />
                <div>
                    <label for='guest-item'>
                         Comment:
                    <textarea placeholder="Leave a comment" />
                    </label>
                    <Link to='/event:id'>
                    <button>RSVP</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Rsvp;