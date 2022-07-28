import React, { useState } from "react";

// Mutations
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

// Auth
import Auth from "../utils/auth";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Mutation: add User
  const [addUser, { error }] = useMutation(ADD_USER);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Card bg='light' className='mt-4 w-75 mx-auto'>
        <Card.Title className='fs-3 text-center mt-3'>Signup</Card.Title>
        <Form onSubmit={handleFormSubmit} className='mx-3'>
          <Form.Group controlId='username' className='mx-3 mt-3'>
            <Form.Label className="fs-5">Username:</Form.Label>
            <Form.Control
              type='username'
              name='username'
              placeholder='Enter a username'
              value={formState.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId='email' className='mx-3 mt-3'>
            <Form.Label className="fs-5">Email:</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Your email'
              value={formState.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId='password' className='mx-3 mt-3'>
            <Form.Label className="fs-5">Password:</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              value={formState.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type='submit' className='btn btn-primary m-3 float-end'>Signup</Button>

        </Form>
      </Card>
    </Container>
  );
};


// <main className="flex-row justify-center mb-4">
//   <div className="col-12 col-md-6">
//     <div className="card">
//       <h4 className="card-header">Sign Up</h4>
//       <div className="card-body">
//         <form onSubmit={handleFormSubmit}>
//           <input
//             className="form-input"
//             placeholder="Your username"
//             name="username"
//             type="username"
//             id="username"
//             value={formState.username}
//             onChange={handleChange}
//           />
//           <input
//             className="form-input"
//             placeholder="Your email"
//             name="email"
//             type="email"
//             id="email"
//             value={formState.email}
//             onChange={handleChange}
//           />
//           <input
//             className="form-input"
//             placeholder="******"
//             name="password"
//             type="password"
//             id="password"
//             value={formState.password}
//             onChange={handleChange}
//           />
//           <button className="btn d-block w-100" type="submit">
//             Submit
//           </button>
//         </form>

//         {error && <div>Signup failed</div>}
//       </div>
//     </div>
//   </div>
// </main>

// Taking out onChange={handleChange} from <form.control> to see if it helps submission of form 
// return (
//   <Card style={{ width: '100%' }}>
//     <Card.Body>
//       <Card.Title>Sign Up</Card.Title>
//       <Form onSubmit={handleFormSubmit}>
//         <Form.Group className='mb-3'>
//           <Form.Label>Username</Form.Label>
//           <Form.Control defaultValue={formState.username} type='username' placeholder='Username'  ></Form.Control>
//         </Form.Group>
//         <Form.Group className='mb-3'>
//           <Form.Label>Email</Form.Label>
//           <Form.Control defaultValue={formState.email} type='email' placeholder='Email'  ></Form.Control>
//         </Form.Group>
//         <Form.Group className='mb-3'>
//           <Form.Label>Password</Form.Label>
//           <Form.Control defaultValue={formState.password} type='password' placeholder='Password' ></Form.Control>
//         </Form.Group>
//         <Button variant='primary' type="submit">Sign Up</Button>
//       </Form>

//       <Card.Text>
//         Already signed up? Login here
//       </Card.Text>

//       {error && <div>Signup failed</div>}

//     </Card.Body>
//   </Card>
// );

export default Signup;
