import React from "react";
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_EVENTS_DASHBOARD } from '../utils/queries';

import Auth from '../utils/auth';
// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UserDash () {
    // const { username: userParam } = useParams();

  const { loading, data } = useQuery( QUERY_ME );

  const user = data?.me || {};

  // navigate to personal profile page if username is yours
//   if (Auth.loggedIn() && Auth.getDashboard().data.username === userParam) {
//     return <Navigate to="/dashboard:id" />;
//   }

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