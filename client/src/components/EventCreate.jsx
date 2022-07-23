import React from "react";

// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateEvent () {
    return (
        <div className="container d-flex justify-content-center">
            <div className="card text-center col-10">
                <div className="card-body">
                    <h2 className="card-title">Create a New Event</h2>
                    <form>
                        <Form.Group className="form-group">
                            <Form.Label>Event name</Form.Label>
                            <Form.Control type='text' placeholder='Enter event name'></Form.Control>
                            <Form.Text className='text-muted'></Form.Text>
                        </Form.Group>
                        
                        <div className="form-group">
                            <div className='input-group date' id='datetimepicker1'>
                                <input type='text' class='form-control'></input>
                                <span class='input-group-addon'>
                                <span class='glyphicon glyphicon-calendar'></span>
                                </span>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label for='event-description'>Event description</label>
                            <textarea className="form-control" 
                                    rows="2" 
                                    placeholder="Enter event description">
                            </textarea>
                        </div>
                        
                        <div className="form-group">
                            <label for="event-items">Items to gather</label>
                            <textarea className="form-control" 
                                    rows="4" 
                                    placeholder="Enter items you need gathered with a comma between each item">
                            </textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Create Event</button>
                        <button type="submit" class="btn btn-primary">Update Event</button>
                        <button type="submit" class="btn btn-primary">Delete Event</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent;