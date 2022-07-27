import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

import { QUERY_EVENT_DETAILS } from "../utils/queries";
import { useQuery } from "@apollo/client";

function Event() {
  const { id: eventId } = useParams();

  const { loading, data } = useQuery(QUERY_EVENT_DETAILS, {
    variables: { _id: eventId },
  });
  const event = data?.event || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  const items = event.items;
  const attendees = event.attendees;

  return (
    <Container>
      <Card>
        <Card.Title>{event.name}</Card.Title>
        <Card.Body>
          <Button>Update</Button>
          <Card.Subtitle>WHEN</Card.Subtitle>
          <Card.Text>{event.date}</Card.Text>
          <Card.Subtitle>WHERE</Card.Subtitle>
          <Card.Text>{event.address}</Card.Text>
          <Card.Subtitle>WHAT</Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
          {items && items.length > 0 && (
            <>
              <Card.Subtitle>Things We Need for the Party</Card.Subtitle>
              <ListGroup>
                {event.items.map((items) => (
                  <ListGroup.Item>{event.items}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
          {attendees && attendees.length > 0 && (
            <>
              <Card.Subtitle>WHO'S COMING</Card.Subtitle>
              <ListGroup>
                {event.attendees.map((attendees) => (
                  <ListGroup.Item>{event.attendees}</ListGroup.Item>
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
