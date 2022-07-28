import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Queries/Mutations
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT_DETAILS } from "../utils/queries";
import { SEND_RSVP } from "../utils/mutations";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';

function Rsvp() {
  // Query: Event
  const { id: eventId } = useParams();
  const { data } = useQuery(QUERY_EVENT_DETAILS, {
    variables: { id: eventId },
  });

  const event = data?.event || {};
  const items = event?.items;

  // Build Item list
  const placeholder = (event && items && event.hasEverything) ? `something` : `${items.filter(item => !item.claimed).map(item => item.name).join(", ")}`

  // Mutation: send RSVP
  const [sendRsvp, { error }] = useMutation(SEND_RSVP);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    nickname: "",
    comment: "",
    items: "",
  });

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await sendRsvp({
        variables: { ...formState, eventId },
      });

      navigate(`../event/${eventId}`, { replace: true });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className='py-4'>
      <Card bg='light'>
        <Card.Header className='fs-3 text-center'>RSVP:</Card.Header>
        <Form
          onSubmit={handleFormSubmit}
          className='mx-5 pb-3'>
          <Form.Group
            controlId='nickname'
            className="mt-3">
            <Form.Label className='fs-5'>Your name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name that the host will see"
              name="nickname"
              value={formState.nickname}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className='fs-5'>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment for the host"
              rows="3"
              name="comment"
              value={formState.comment}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className='fs-5'>What can you bring?</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={`Can you bring ${placeholder}?`}
              rows="3"
              name="items"
              value={formState.items}
              onChange={handleChange}
            >
            </Form.Control>
          </Form.Group>
          <Button type='submit'>RSVP</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Rsvp;
