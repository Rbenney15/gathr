import React from "react";
import { Link } from "react-router-dom";

// Auth
import Auth from '../utils/auth';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function HomePage() {
  return (
    <Container className='d-flex'>
      <Card bg='light' className='mt-4 mx-auto'>
        <Row className='d-flex align-items-center'>
          <Col className="d-grid mt-5 mx-5">
            <h1 className='fs-1 fst-italic'>Welcome to Gathr</h1>
            <p className='mx-3 fs-4'></p>
            <div className='fs-5'>
              <div>
                <p>Planning an Event? </p>
              </div>
              <div>
                <p>Have you figured out a way to organize your guest list, shopping list, and event calendar all in one location?</p>
              </div>
              <div>
                <p>Let us help you Gather your friends, family, and your supplies to put on an event to remember!</p>
              </div>
              <div>
                <h3 className='fst-italic'>Host, Plan, Gathr</h3>
              </div>
            </div>
            <div className='w-50 my-4'>
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
      </Card>
    </Container>
  )
}

export default HomePage;
