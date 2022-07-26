import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

import { ADD_EVENT } from '../utils/mutations';
import { QUERY_ME, QUERY_EVENT_DETAILS } from '../utils/queries';
import { useMutation } from '@apollo/client';

// bootstrap components
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

function CreateEvent() {
    const [formState, setFormState] = useState({ name: '', description: '', date: '', items: '' });
    const [addEvent, { error }] = useMutation(ADD_EVENT);

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

    Auth.login(data.login.token);
    console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      name: '',
      date: '',
      description: '',
      items: '',
    });
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
    <div>
        <h2>Create a New Event</h2>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label for='event-name'>Event name: </label>
                <input 
                className="form-input"
                placeholder="Name Of Your Event"
                name="name"
                type="name"
                id="name"
                value={formState.name}
                onChange={handleChange} />
            </div>
            <br />
            <div>
                <label for='event-time'>Event date: </label>
                <input 
                className="form-input"
                placeholder="Event Date"
                name="date"
                type="date"
                id="date"
                value={formState.date}
                onChange={handleChange} />
            </div>
            <br />
            <div>
                <label for='event-desc'>Event description: </label>
                <input 
                className="form-input"
                placeholder="Describe Your Event"
                name="description"
                type="description"
                id="description"
                value={formState.description}
                onChange={handleChange}/>
            </div>
            <br />
            <div>
                <label for='items'>Items to bring: </label>
                <input 
                className="form-input"
                placeholder="Let us know the type of peanut you are bringing"
                name="items"
                type="items"
                id="items"
                value={formState.items}
                onChange={handleChange}/>
            </div>
            <button type='submit'>Create Event</button>
        </form>
    </div>
)


    // return (
    //     <div className="container d-flex justify-content-center">
    //         <div className="card text-center col-10">
    //             <div className="card-body">
    //                 <h2 className="card-title">Create a New Event</h2>
    //                 <form>
    //                     <Form.Group className="form-group">
    //                         <Form.Label>Event name</Form.Label>
    //                         <Form.Control type='text' placeholder='Enter event name'></Form.Control>
    //                         <Form.Text className='text-muted'></Form.Text>
    //                     </Form.Group>
                        
    //                     <div className="form-group">
    //                         <div className='input-group date' id='datetimepicker1'>
    //                             <input type='text' class='form-control'></input>
    //                             <span class='input-group-addon'>
    //                             <span class='glyphicon glyphicon-calendar'></span>
    //                             </span>
    //                         </div>
    //                     </div>
                        
    //                     <div className="form-group">
    //                         <label for='event-description'>Event description</label>
    //                         <textarea className="form-control" 
    //                                 rows="2" 
    //                                 placeholder="Enter event description">
    //                         </textarea>
    //                     </div>
                        
    //                     <div className="form-group">
    //                         <label for="event-items">Items to gather</label>
    //                         <textarea className="form-control" 
    //                                 rows="4" 
    //                                 placeholder="Enter items you need gathered with a comma between each item">
    //                         </textarea>
    //                     </div>
    //                     <button type="submit" class="btn btn-primary">Create Event</button>
    //                     <button type="submit" class="btn btn-primary">Update Event</button>
    //                     <button type="submit" class="btn btn-primary">Delete Event</button>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // )
}


export default CreateEvent;