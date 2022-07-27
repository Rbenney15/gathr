import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Auth from '../utils/auth';

import { ADD_EVENT } from '../utils/mutations';
import { useMutation } from '@apollo/client';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// bootstrap components
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

function CreateEvent() {
    const [formState, setFormState] = useState({ name: '', description: '', date: '', items: '' });
    const [addEvent, { error }] = useMutation(ADD_EVENT);
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
        const { data } = await addEvent({
          variables: { ...formState },
        });

        navigate('../dashboard', { replace: true });

      console.log(data);
      } catch (e) {
        console.error(e);
      }

      // // clear form values
      // setFormState({
      //   name: '',
      //   date: '',
      //   description: '',
      //   items: '',
      // });
    };
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
            controlId='event-name'
            className='mt-3'>
            <Form.Label className='fs-5'>Event Name:</Form.Label>
            <Form.Control 
              type='event-name' 
              name='name' 
              placeholder='What is the name of the event?' 
              id='name' 
            />
          </Form.Group>
          <Form.Group 
            controlId='event-time'
            className='mt-3'>
            <Form.Label className='fs-5'>Event Date:</Form.Label>
            <Form.Control 
              type='date' 
              name='date' 
              id='date' />
          </Form.Group>
          <Form.Group 
            controlId='event-desc'
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
//     <div>
//         <h2>Create a New Event</h2>
//         <form onSubmit={handleFormSubmit}>
//             <div>
//                 <label for='event-name'>Event name: </label>
//                 <input 
//                 className="form-input"
//                 placeholder="Name Of Your Event"
//                 name="name"
//                 type="name"
//                 id="name"
//                 value={formState.name}
//                 onChange={handleChange} />
//             </div>
//             <br />
//             <div>
//                 <label for='event-time'>Event date: </label>
//                 <input 
//                 className="form-input"
//                 placeholder="Event Date"
//                 name="date"
//                 type="date"
//                 id="date"
//                 value={formState.date}
//                 onChange={handleChange} />
//             </div>
//             <br />
//             <div>
//                 <label for='event-desc'>Event description: </label>
//                 <input 
//                 className="form-input"
//                 placeholder="Describe Your Event"
//                 name="description"
//                 type="description"
//                 id="description"
//                 value={formState.description}
//                 onChange={handleChange}/>
//             </div>
//             <br />
//             <div>
//                 <label for='items'>Items to bring: </label>
//                 <input 
//                 className="form-input"
//                 placeholder="Let us know the type of peanut you are bringing"
//                 name="items"
//                 type="items"
//                 id="items"
//                 value={formState.items}
//                 onChange={handleChange}/>
//             </div>
//             <button type='submit' >Create Event</button>   
//         </form>
//     </div>
// )

}


export default CreateEvent;