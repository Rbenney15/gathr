import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
// bootstrap components

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

function UserDash() {
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
  const events = user.events;

  return (
    <Container>
      <Card>
        <Card.Title>Welcome {user.username}</Card.Title>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Number of RSVPs</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <>
                  <tr>
                    <td colSpan='3'>No Events Created Yet</td>
                  </tr>
                </>
              ) : (
                <>
                  {events.map((event) => (
                    <tr>
                      <td>
                        <Link
                          to={{
                            pathname: `/event/${event._id}`,
                          }}
                        >
                          {event.name}
                        </Link>
                      </td>
                      <td>{event.date}</td>
                      <td>{event.attendeeCount}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </Table>
          <Link to="/create-event">
            <Button type="submit" className="btn btn-primary">
              Create Event
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserDash;
