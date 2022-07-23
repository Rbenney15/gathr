import React from "react";

function CreateEvent () {
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
            </form>
        </div>
    )
}

export default CreateEvent;