import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';
import ListGroup from "react-bootstrap/esm/ListGroup";

import { QUERY_EVENT_DETAILS } from "../utils/queries";
import { SEND_RSVP } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

function Rsvp() {
  const { id: eventId } = useParams();
  const { loading, data } = useQuery(QUERY_EVENT_DETAILS, {
    variables: { id: eventId },
  });
  const [sendRsvp, { error }] = useMutation(SEND_RSVP);
  const navigate = useNavigate();
  const event = data?.event || {};
  console.log(event);

  const [formState, setFormState] = useState({
    nickname: "",
    comment: "",
    items: "",
  }); 

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await sendRsvp({
        variables: { ...formState, eventId },
      });

      navigate(`../event/${eventId}`, { replace: true });

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  const items = event.items;
  console.log(items);
  return (
    <Container className='py-4'>
    <Card bg='light'>
        <Card.Header className='fs-3 text-center'>RSVP</Card.Header>
            <Form 
                onSubmit={handleFormSubmit}
                className='mx-5'>
            <Form.Group 
                controlId='nickname'
                className="mt-3">
                <Form.Label className='fs-5'>Your name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Name that the host will see"
                name="nickname"
                id="nickname"
                value={formState.nickname}
                onChange={handleChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className='fs-5'>Comment</Form.Label>
                <Form.Control
                as="textarea"
                placeholder="Leave a comment for the host"
                rows="3"
                name="comment"
                id="comment"
                value={formState.comment}
                onChange={handleChange}
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                {items && items.length > 0 && (
                <>
                    {items.map((item) => (
                    <ListGroup.Item className="mb-3">
                        <Form.Check type='checkbox' id={item.name} label={item.name} />
                    </ListGroup.Item>
                    ))}
                </>
                )}
            </Form.Group>
            <Button type='submit'>RSVP</Button>
            </Form>
      </Card>
    </Container>
  );
}

export default Rsvp;
