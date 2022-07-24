import React from 'react';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Landing = () => {
    const { data: userData } = useQuery(QUERY_ME);
    
    const loggedIn = Auth.loggedIn();

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Welcome to Gathr</Card.Title>
                    <Card.Text>
                        Have you always wanted to host a peanut party? Gathr is the place to be!
                    </Card.Text>
                </Card.Body>
                <Button>Create Event</Button>
            </Card>
        </Container>
    );
};

export default Landing;