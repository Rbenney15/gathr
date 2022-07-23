import React from "react";
import { Link, useParams, Navigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_EVENTS_DASHBOARD } from '../utils/queries';

import Auth from '../utils/auth';

function UserDash () {
    const { username: userParam } = useParams();

  const { loading, data } = useQuery( QUERY_ME, {variables: {username: userParam}} );

  const user = data?.me || {};
  console.log(useParams())
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getDashboard().data.username === userParam) {
    return <Navigate to="/dashboard:id" />;
  }

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
        <div>
            <h1>Welcome {user.username}!</h1>
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