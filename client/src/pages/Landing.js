import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Landing = () => {

    return (
        <main>
            <h1>Hello World</h1>
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
        </main>
    );
};

export default Landing;