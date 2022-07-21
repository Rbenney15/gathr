import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from './utils/mutations';
import '../CSS/signup.css';

import Auth from './utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
        <div className="form-inner">
            <h2>Signup</h2>
            {(error !== "") ? ( <div className="error">{error}</div> ) : ""}
            <div className="form-group">
                <label htmlFor='name'>Name:</label>
                <input type='text' name='name' id='name' onSubmit={handleFormSubmit} />
            </div>
            <div className="form-group">
                <label htmlFor='email'>Email:</label>
                <input type='email' name='email' id='email' onSubmit={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor='password'>Password:</label>
                <input type='password' name='password' id='password' onSubmit={handleFormSubmit} />
            </div>
            <input type="submit" value="Signup" />
        </div>
    </form>
)

  // return (
  //   <main className="flex-row justify-center mb-4">
  //     <div className="col-12 col-md-6">
  //       <div className="card">
  //         <h4 className="card-header">Sign Up</h4>
  //         <div className="card-body">
  //           <form onSubmit={handleFormSubmit}>
  //             <input
  //               className="form-input"
  //               placeholder="Your username"
  //               name="username"
  //               type="username"
  //               id="username"
  //               value={formState.username}
  //               onChange={handleChange}
  //             />
  //             <input
  //               className="form-input"
  //               placeholder="Your email"
  //               name="email"
  //               type="email"
  //               id="email"
  //               value={formState.email}
  //               onChange={handleChange}
  //             />
  //             <input
  //               className="form-input"
  //               placeholder="******"
  //               name="password"
  //               type="password"
  //               id="password"
  //               value={formState.password}
  //               onChange={handleChange}
  //             />
  //             <button className="btn d-block w-100" type="submit">
  //               Submit
  //             </button>
  //           </form>

  //           {error && <div>Signup failed</div>}
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );
};

export default Signup;
