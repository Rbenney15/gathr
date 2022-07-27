import React from "react";
import { Link, Navigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_EVENTS_DASHBOARD } from '../utils/queries';

import Auth from '../utils/auth';
// bootstrap components
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

function UserDash () {

  const { loading, data, error } = useQuery(QUERY_ME);
  const user = data?.me || {};
  
  console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
    return (
        <div className="container d-flex justify-content-center">
            <div className="card col-10">
                <div className="card-body">
                    <h2 className="card-title">Welcome {user.username}!</h2>
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