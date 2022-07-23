import React from "react";
import { Link } from 'react-router-dom';

// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UserDash () {
    return (
        <div className="container d-flex justify-content-center">
            <div className="card col-10">
                <div className="card-body">
                    <h2 className="card-title">Welcome User!</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Event</th>
                                    <th scope="col">Date and Time</th>
                                    <th scope="col">Number of RSVPs</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Event name</td>
                                    <td>Event time</td>
                                    <td>attendeeCount</td>
                                </tr>
                            </tbody>
                        </table>
                            <Link to='/create-event'>
                                <button type="submit" className="btn btn-primary">Create Event</button>
                            </Link>
                </div>
            </div>
        </div>
    )
}

export default UserDash;