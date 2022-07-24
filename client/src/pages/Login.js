import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const Login = (props) => {
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

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group classname='mb-3' >
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={handleChange} value={formState.email} type='email' placeholder='Email'></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handleChange} value={formState.password} type='password' placeholder='Password'></Form.Control>
            </Form.Group>
            <Button variant='primary' type="submit">Login</Button>
          </Form>
          <Card.Text>
            Don't have a login? Sign up here
          </Card.Text>
  
          {error && <div>Signup failed</div>}
          
        </Card.Body>
      </Card>
    );
};

export default Login;

