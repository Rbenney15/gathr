import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

// bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';


function HomePage ({updatePage}) {
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Welcome to Gathr</Card.Title>
                    <Card.Text>
                        Have you always wanted to host a peanut party? Gathr is the place to be!
                    </Card.Text>
                    <Button>Create an Event</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default HomePage;
