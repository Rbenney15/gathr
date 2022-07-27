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
      <Card border="primary" bg="light" className="text-center justify-content-center">
        <Card.Header>Share this link with your friends!</Card.Header>
        <Card.Title className="mt-3 fs-2">{event.name}</Card.Title>
        <Card.Body>
            <div>
                <Card.Title>WHEN</Card.Title>
                <Card.Text>{event.date}</Card.Text>
            </div>
            <div className="mt-3">
                <Card.Title>WHAT</Card.Title>
                <Card.Text>{event.description}</Card.Text>
            </div>
          {items && items.length > 0 && (
            <div className="w-50 p-4 mx-auto">
              <Card.Title>Things We Need for the Party</Card.Title>
              <ListGroup variant="flush">
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
                  <ListGroup.Item>{attendee.nickname}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Card.Body>
        <div className="mt-3 m-5">
          {" "}
          {Auth.loggedIn() ? (
            <Row>
              <Col className="d-grid">
                <Button>Update</Button>
              </Col>
              <Col className="d-grid">
                <Button variant='warning'>Delete</Button>
              </Col>
            </Row>
          ) : (
            <Link to="/rsvp">
              <Button>RSVP</Button>
            </Link>
          )}
        </div>
      </Card>
    </Container>
  );
}

export default Event;
