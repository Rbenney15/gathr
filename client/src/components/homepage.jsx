import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

// bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function HomePage ({updatePage}) {
    return (
        <Container className='d-flex'>
            <Row className='d-flex align-items-center'>
                <Col className="d-grid mt-5 mx-5">
                    <p className='fs-1 fst-italic'>Welcome to Gathr</p>
                    <p className='mx-3 fs-4'></p>
                    <div className='fs-5'>
                        <div>
                            <p>Planning on hosting a party for your community? </p>
                        </div>
                        <div>
                            <p>Need a way to organize your guest list, shopping list, and event calendar all in one place?</p>
                        </div>
                        <div>
                            <p>Gathr is the perfect all-in-one solution for your community event needs.</p>
                        </div>
                    </div>
                    <div className='w-50 mt-3'>
                        {Auth.loggedIn() ? (
                            <>
                            <Link to='/create-event'>
                                <Button variant='primary' size='lg' type="submit">Create an Event</Button>
                            </Link>
                            </>
                        ) : (
                            <>
                            <Link to='/signup'>
                                <Button variant='primary' size='lg' type='submit'>Create an Account</Button>
                            </Link>
                            </>
                        )}
                    </div>
                    </Col>
                </Row>
        </Container>
    )
}

export default HomePage;
