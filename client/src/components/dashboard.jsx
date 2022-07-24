import React from "react";
import { Link } from 'react-router-dom';

// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'

function UserDash () {
    return (
        <Container>
            <Card>
                <Card.Title>Welcome User</Card.Title>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Date and Time</th>
                                <th>Number of RSVPs</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Event name</td>
                                <td>Event time</td>
                                <td>attendeeCount</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Link to='/create-event'>
                        <button type="submit" className="btn btn-primary">Create Event</button>
                    </Link>
                    
                </Card.Body>
            </Card>
        </Container>        
    )
}

export default UserDash;