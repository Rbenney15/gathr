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
  // window.location.reload();

  const { loading, data, error } = useQuery(QUERY_ME);
  const user = data?.me || {};

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
    <Container className='py-4'>
      <Card bg='light'>
        <Card.Header className='fs-3 text-center'>Welcome {user.username}!</Card.Header>
        <Card.Text className='text-center mt-3' >Here are all of your upcoming events:</Card.Text>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th className='text-center'>Number of RSVPs</th>
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
                      <td className='text-center'>{event.attendeeCount}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </Table>
          <Link to="/create-event">
            <div className='d-grid mx-auto'>
              <Button
                type="submit" 
                className="btn btn-primary m-3"
                size='small'>
                Create New Event
              </Button>
              </div>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserDash;
