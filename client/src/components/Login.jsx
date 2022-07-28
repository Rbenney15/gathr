import React, { useState } from 'react';

// Mutations
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Container>
      <Card bg='light' className='mt-4 w-75 mx-auto'>
        <Card.Title className='fs-3 text-center mt-3'>Login</Card.Title>
        <Form onSubmit={handleFormSubmit} className='mx-3'>
          <Form.Group controlId='login' className='mx-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Your email'
              value={formState.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId='password' className='mx-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              value={formState.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type='submit' className='btn btn-primary m-3 float-end'>Login</Button>

        </Form>
      </Card>
    </Container>
  );
};

export default Login;
