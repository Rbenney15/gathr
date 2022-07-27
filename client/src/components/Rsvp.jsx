import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import { QUERY_EVENT_DETAILS } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { SEND_RSVP } from "../utils/mutations";
import ListGroup from "react-bootstrap/esm/ListGroup";

function Rsvp() {
  const [formState, setFormState] = useState({
    nickname: "",
    comment: "",
    items: "",
  }); 
  const [sendRsvp, { error }] = useMutation(SEND_RSVP);
  const navigate = useNavigate();
  const { id: eventId } = useParams();
  const { loading, data } = useQuery(QUERY_EVENT_DETAILS, {
    variables: { id: eventId },
  });
  const event = data?.event || {};
  console.log(event);

  // update state based on form input changes
  const handleChange = (rsvp) => {
    const { name, value } = rsvp.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (rsvp) => {
    rsvp.preventDefault();

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
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>RSVP</Card.Title>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name that the host will see"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment for the host"
              rows="3"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            {items && items.length > 0 && (
              <>
                {items.map((type) => (
                  <ListGroup.Item key={`${type._id}`} className="mb-3">
                    <Form.Check type={type._id} id={`${type._id}`} label={`${type.name}`} />
                  </ListGroup.Item>
                ))}
              </>
            )}
          </Form.Group>
          <Button type='submit'>RSVP</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Rsvp;
