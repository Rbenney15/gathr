import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';

import { QUERY_EVENT_DETAILS } from '../utils/queries';
import { UPDATE_EVENT } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';

// bootstrap components
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UpdateEvent() {
  // Query Event information
  const { id: eventId } = useParams();
  const { loading, data } = useQuery(QUERY_EVENT_DETAILS, {
    variables: { id: eventId }
  });

  const event = data?.event || {};

  // Use update mutation
  const [formState, setFormState] = useState(
    { name: event.name, description: event.description, timestamp: event.timestamp, items: '' }
  );
  const [updateEvent, { error }] = useMutation(UPDATE_EVENT);
  const navigate = useNavigate();

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
      console.log({ ...formState, eventId });
      const { data } = await updateEvent({
        variables: { ...formState, eventId },
      });

      navigate(`../event/${eventId}`);

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

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
  return (
    <Container
      className='py-4'>
      <Card bg='light'>
        <Card.Header className='fs-3 text-center'>Update an Event</Card.Header>
        <Form
          onSubmit={handleFormSubmit}
          className='mx-5'>
          <Form.Group
            className='mt-3'>
            <Form.Label className='fs-5'>Event Name:</Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder={event.name}
              value={formState.name}
              id='name'
              onChange={handleChange} />
          </Form.Group>
          <Form.Group
            className='mt-3'>
            <Form.Label className='fs-5'>Event Date:</Form.Label>
            <Form.Control
              type='date'
              name='timestamp'
              defaultValue={event.timestamp}
              id='timestamp'
              onChange={handleChange} />
          </Form.Group>
          <Form.Group
            className='mt-3'>
            <Form.Label className='fs-5'>Event Description:</Form.Label>
            <Form.Control
              as='textarea'
              name='description'
              placeholder={event.description}
              rows='3'
              value={formState.description}
              id='description'
              onChange={handleChange} />
          </Form.Group>
          <Form.Group
            className='mt-3'>
            <Form.Label className='fs-5'>Additional Items:</Form.Label>
            <Form.Control
              as='textarea'
              name='items'
              placeholder={`${event.items.map(item => item.name).join(", ")}... what else?`}
              rows='3'
              value={formState.items}
              id='items'
              onChange={handleChange} />
          </Form.Group>

          <Button
            type='submit'
            className='btn btn-primary m-3 float-end'>
            Update Event!
          </Button>

        </Form>
      </Card>
    </Container>
  )
}

export default UpdateEvent;
