import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';

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
  const navigate = useNavigate();

  const handleClick = useCallback(() => navigate("/dashboard", {replace: true}), [navigate])   

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

    // handleClick();  
  };
  // return (
  //   <Card style={{ width: '100%' }}>
  //   <Card.Body>
  //     <Card.Title>Login</Card.Title>
  //     <Form>
  //       <Form.Group className='mb-3' onSubmit={handleFormSubmit}>
  //         <Form.Label>Email</Form.Label>
  //         <Form.Control onChange={handleChange} defaultValue={formState.email} type='input' placeholder='Email Address'></Form.Control>
  //       </Form.Group>
  //       <Form.Group className='mb-3' onSubmit={handleFormSubmit}>
  //         <Form.Label>Password</Form.Label>
  //         <Form.Control onChange={handleChange} defaultValue={formState.password} type='password' placeholder='Password'></Form.Control>
  //       </Form.Group>
  //       <Button variant='primary' type="submit">Login</Button>
  //     </Form>
  //     <Card.Text>
  //       Don't have a login? Sign up here
  //     </Card.Text>

  //     {error && <div>Signup failed</div>}
      
  //   </Card.Body>
  // </Card>
  // )
  return (
    <main className="flex-row justify-center mb-4">
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
                <button className="btn d-block w-100" type="button" onClick={handleClick}>
                  Submit
                </button>
            </form>

            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;