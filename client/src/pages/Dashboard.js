import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_EVENTS_DASHBOARD } from "../utils/queries";

import Auth from "../utils/auth";

const Dashboard = (props) => {
  const { username: userParam } = useParam();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to dashboard if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/dashboard:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <Container>
      <Card>
        <Card.Title>Welcome User</Card.Title>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event</th>
                <th>Date and Time</th>
                <th>Number of RSVPs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Event name</td>
                <td>Event time</td>
                <td>attendeeCount</td>
              </tr>
            </tbody>
          </Table>
          <Link to="/create-event">
            <button type="submit" className="btn btn-primary">
              Create Event
            </button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
