import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

// Mutations
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function CreateEvent() {
  // Mutation: create Event
  const [formState, setFormState] = useState({ name: '', description: '', date: '', items: '' });
  const [addEvent, { error }] = useMutation(ADD_EVENT);
  const navigate = useNavigate();

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
      const { data } = await addEvent({
        variables: { ...formState },
      });

      navigate('../dashboard', { replace: true });

      console.log(data);
    } catch (e) {
      console.error(e);
    }

  };

  // Auth
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
        <Card.Header className='fs-3 text-center'>Create a New Event</Card.Header>
        <Form
          onSubmit={handleFormSubmit}
          className='mx-5'>
          <Form.Group
            controlId='name'
            className='mt-3'>
            <Form.Label className='fs-5'>Event Name:</Form.Label>
            <Form.Control
              type='event-name'
              name='name'
              placeholder='What is the name of the event?'
              // id='name' 
              value={formState.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            controlId='date'
            className='mt-3'>
            <Form.Label className='fs-5'>Event Date:</Form.Label>
            <Form.Control
              type='date'
              name='date'
              // id='date' 
              value={formState.date}
              onChange={handleChange} />
          </Form.Group>
          <Form.Group
            controlId='description'
            className='mt-3'>
            <Form.Label className='fs-5'>Event Description:</Form.Label>
            <Form.Control
              as='textarea'
              name='description'
              rows='3'
              placeholder='What is the theme of the event? Where will it be? Should attendees bring friends?'
              value={formState.description}
              onChange={handleChange} />
          </Form.Group>
          <Form.Group
            controlId='items'
            className='mt-3'>
            <Form.Label className='fs-5'>Items to Bring:</Form.Label>
            <Form.Control
              as='textarea'
              name='items'
              rows='3'
              placeholder='Enter a list of items you would like attendees to bring, and make sure to separate each item with a comma.'
              value={formState.items}
              onChange={handleChange} />
          </Form.Group>

          <Button
            type='submit'
            className='btn btn-primary m-3 float-end'>
            Create Event!
          </Button>

        </Form>
      </Card>
    </Container>
  )
}

export default CreateEvent;
