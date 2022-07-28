import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Auth from "../utils/auth";

import { QUERY_EVENT_DETAILS } from "../utils/queries";
import { useQuery } from "@apollo/client";

function Event() {
  const { id: eventId } = useParams();

  const { loading, data } = useQuery(QUERY_EVENT_DETAILS, {
    variables: { id: eventId },
  });
  const event = data?.event || {};
  console.log(event);
  if (loading) {
    return <div>Loading...</div>;
  }

  const items = event.items;
  const attendees = event.attendees;

  return (
    <Container className="py-4">
      <Card
        border="primary"
        bg="light"
        className="text-center justify-content-center"
      >
        <Card.Header>Share this link with your friends!</Card.Header>
        <Card.Title className="mt-3 fs-2">{event.name}</Card.Title>
        <Card.Body>
          <Card.Subtitle>WHEN</Card.Subtitle>
          <Card.Text>{event.date}</Card.Text>
          <Card.Subtitle>WHAT</Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
          {Auth.loggedIn() ? (
            <>
              <Button>Update</Button>
              <Button>Delete</Button>
            </>
          ) : (
            <Link
              to={{
                pathname: `/rsvp/${event._id}`,
              }}
            >
              <Button>RSVP</Button>
            </Link>
          )}
          {items && items.length > 0 && (
            <div className="py-4 mx-auto">
              <Card.Subtitle>THINGS WE NEED</Card.Subtitle>
              <ListGroup>
                {event.items.map((item) => (
                  <ListGroup.Item>{item.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
          {attendees && attendees.length > 0 && (
            <>
              <Card.Subtitle>WHO'S COMING</Card.Subtitle>
              <ListGroup>
                {event.attendees.map((attendee) => (
                  <>
                    <ListGroup.Item>
                      {attendee.nickname} is coming and says "{attendee.comment}"
                    </ListGroup.Item>
                  </>
                ))}
              </ListGroup>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Event;
