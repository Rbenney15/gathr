import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

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
              {/* <Link to={`/userdash/${user.name}`}> */}
              <Link to='/userdash'>
                <button className="btn d-block w-100" type="submit">
                  Submit
                </button>
              </Link>
            </form>

            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from './utils/mutations';

// import Auth from './utils/auth';

// const LoginForm = (props) => {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [login, { error }] = useMutation(LOGIN_USER);

//   // update state based on form input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const { data } = await login({
//         variables: { ...formState },
//       });

//       Auth.login(data.login.token);
//     } catch (e) {
//       console.error(e);
//     }

//     // clear form values
//     setFormState({
//       email: '',
//       password: '',
//     });
//   };

//     return (
//         <form onSubmit={handleFormSubmit}>
//             <div className="form-inner">
//                 <h2>Login</h2>
//                 {(error !== "") ? ( <div className="error">{error}</div> ) : ""}
//                 <div className="form-group">
//                     <label htmlFor='name'>Name:</label>
//                     <input type='text' name='name' id='name' onSubmit={handleFormSubmit} />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor='email'>Email:</label>
//                     <input type='email' name='email' id='email' onSubmit={handleChange} />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor='password'>Password:</label>
//                     <input type='password' name='password' id='password' onSubmit={handleFormSubmit} />
//                 </div>
//                 <input type="submit" value="Login" />
//             </div>
//         </form>
//     )
// }

// export default LoginForm;