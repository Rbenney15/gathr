import React, { useState} from "react";
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';
import { QUERY_EVENT_DETAILS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

// bootstrap components
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

function CreateEvent () {
    if (!Auth.loggedIn()) {
        return (
          <h4>
            You need to be logged in to see this. Use the navigation links above to
            sign up or log in!
          </h4>
        );
    }
    const [eventText, setText] = useState('');
    // const [characterCount, setCharacterCount] = useState(0);

    const [addEvent, { error }] = useMutation(ADD_EVENT, {
        update(cache, { data: { addEvent } }) {
        
            // could potentially not exist yet, so wrap in a try/catch
        try {
            // update me array's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, events: [...me.events, addEvent] } },
            });
        } catch (e) {
            console.warn("First event created by user!")
        }

        // update events array's cache
        const { events } = cache.readQuery({ query: QUERY_EVENT_DETAILS });
        cache.writeQuery({
            query: QUERY_EVENT_DETAILS,
            data: { thoughts: [addEvent, ...events] },
        });
        }
    });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      s
    //   setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addEvent({
        variables: { eventText },
      });

      // clear form value
      setText('');
    } catch (e) {
      console.error(e);
    }
  };
  
    return (
        <div>
            <h2>Create a New Event</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label for='event-name'>Event name: </label>
                    <input type='text'></input>
                </div>
                <br />
                <div>
                    <label for='event-time'>Event date: </label>
                    <input type='text'></input>
                </div>
                <br />
                <div>
                    <label for='event-desc'>Event description: </label>
                    <textarea
                    placeholder="Describe your event here..."
                    value={eventText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                    ></textarea>
                </div>
                <br />
                <div>
                    <label for='items'>Items to bring: </label>
                    <input type='checkbox' checked={this.state.claimed}></input>
                    <label>Peanuts</label>
                    <input type='checkbox'></input>
                    <label>Bucket</label>
                    <input type='checkbox'></input>
                    <label>Paper Plates</label>
                    <input type='checkbox'></input>
                    <label>Roasted Peanuts</label>
                    <input type='checkbox'></input>
                    <label>Salted Peanuts</label>
                </div>
                <button type="submit">Create Event</button>
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
