import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries";

import Auth from "../utils/auth";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const Dashboard = (props) => {
  const { username: userParam } = useParams();

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
            <Button variant='primary'>Create Event</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
