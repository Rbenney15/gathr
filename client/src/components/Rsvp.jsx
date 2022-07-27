import React from "react";
import { Link } from "react-router-dom";

// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function Rsvp () {
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>RSVP</Card.Title>
                <Form>
                    <Form.Group classname='mb-3' controlId='rsvpName'>
                        <Form.Label>Your name</Form.Label>
                        <Form.Control type='text' placeholder='Name that the host will see'></Form.Control>
                    </Form.Group>
                    <Form.Group classname='mb-3'controlId='rsvpComment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea' placeholder='Leave a comment for the host' rows={3}></Form.Control>
                    </Form.Group>
                    <Form.Label>Select items from the list that you will bring</Form.Label>
                    {['example-item-1', 'example-item-2', 'example-item-3'].map((type) => (
                        <div key={`${type}`} className='mb-3'>
                            <Form.Check type={type} id={`${type}`} label={`${type}`} />
                        </div>
                    ))}
                    <Button as='input' type='submit' value='RSVP'></Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Rsvp;