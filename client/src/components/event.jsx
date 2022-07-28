import { React, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import copy from 'copy-to-clipboard';

import Auth from "../utils/auth";

import { QUERY_EVENT_DETAILS } from "../utils/queries";
import { DELETE_EVENT } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

function Event() {
  // COPY BUTTON
  const [copied, setCopied] = useState(false);

  function copy() {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
  }

  // QUERY EVENT
  const { id: eventId } = useParams();
  const { loading, data } = useQuery(QUERY_EVENT_DETAILS, {
    variables: { id: eventId },
  });

  const event = data?.event || {};
  console.log(event);

  const items = event.items;
  const attendees = event.attendees;

  // MUTATION DELETE EVENT
  const [deleteEvent, { error }] = useMutation(DELETE_EVENT);
  const navigate = useNavigate();

  const handleDeleteButton = async (event) => {
    event.preventDefault();

    try {
      const { data } = await deleteEvent({
        variables: { eventId }
      });

      console.log(data.deleteEvent);

      if (data.deleteEvent) {
        navigate(`../dashboard`);
      } else {
        console.error(`Unable to delete event: ${eventId}`);
      }

    } catch (e) {
      console.error(e);
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="py-4">
      <Card
        border="primary"
        bg="light"
        className="text-center justify-content-center"
      >
        <Button onClick={copy}>Share this link with your friends!</Button>
        <Card.Title className="mt-3 fs-2">{event.name}</Card.Title>
        <Card.Body>
          <Card.Subtitle>WHEN</Card.Subtitle>
          <Card.Text>{event.date}</Card.Text>
          <Card.Subtitle>WHAT</Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>

          <div className="mt-3 mb-3 m-5 w-50 mx-auto">
            {" "}
            {Auth.loggedIn() ? (
              <Row>
                <Link
                  to={{
                    pathname: `/update/${event._id}`,
                  }}>
                  <Col className="d-grid">
                    <Button className="m-1">Update</Button>
                  </Col>
                </Link>
                <Col className="d-grid">
                  <Button
                    className="m-1" 
                    variant="warning"
                    onClick={handleDeleteButton}>Delete</Button>
                </Col>
              </Row>
            ) : (
              <Link
                to={{
                  pathname: `/rsvp/${event._id}`,
                }}
              >
                <Button>RSVP</Button>
              </Link>
            )}
          </div>

          {items && items.length > 0 && (
            <div className="mx-auto">
              <Card.Subtitle>THINGS WE NEED</Card.Subtitle>
              <ListGroup>
                {event.items.map((item) => (
                  <ListGroup.Item>{item.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
          {attendees && attendees.length > 0 && (
            <div className="pt-3">
              <Card.Subtitle>WHO'S COMING</Card.Subtitle>
              <ListGroup>
                {event.attendees.map((attendee) => (
                  <>
                    <ListGroup.Item>
                      {/* Attendee has stuff */}
                      {attendee.items && attendee.items.length > 0 ? 
                        (
                          <>
                            {attendee.nickname} is bringing {attendee.items.map(item => item.name).join(", ")}
                          </>
                        ) : (
                          <>
                            {attendee.nickname} is coming
                          </>
                        )
                      }
                      {/* Attendee has stuff */}
                      {attendee.comment &&
                        (
                          <div style={ {text_decoration: 'underline'} }>
                            <i>"{attendee.comment}"</i>
                          </div>
                        )
                      }
                      {/* and says "{attendee.comment}" */}
                    </ListGroup.Item>
                  </>
                ))}
              </ListGroup>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Event;