import React from "react";

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
                    <input name='guest-rsvp-yes' type='radio'></input>
                    <label for='guest-rsvp-yes'>Yes</label>
                    <input name='guest-rsvp-no' type='radio'></input>
                    <label for='guest-rsvp-no'>No</label>
                </div>
                <br />
                <div>
                    <label for='guest-item'>
                         What item will you be bringing?:
                    <textarea />
                    </label>
                </div>
            </form>
        </div>
    )
}

export default Rsvp;