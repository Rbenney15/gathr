// function LoginForm({ Login, error }) {
//     const [details, setDetails] = useState({name: "", email: "", password: ""});
     
//     const submitHandler = e => {
//         e.preventDefault();

//         Login(details);
//     }
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './utils/mutations';

import Auth from './utils/auth';

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';

const LoginForm = (props) => {
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
      <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form>
          <Form.Group classname='mb-3' onSubmit={handleFormSubmit}>
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={handleChange} value={formState.username} type='username' placeholder='Username'></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' onSubmit={handleFormSubmit}>
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
    )
}

export default LoginForm;