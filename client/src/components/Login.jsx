import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Auth from '../utils/auth';
// import { useNavigate } from 'react-router-dom';


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
  // const navigate = useNavigate();

  // const handleClick = useCallback(() => navigate("/dashboard", {replace: true}), [navigate])   

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
                id='email'
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
                id='password'
                placeholder='********'
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

    /* <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
                <button className="btn d-block w-100" type="submit">
                  Submit
                </button>
            </form>

            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main> */

export default Login;