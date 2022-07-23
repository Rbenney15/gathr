import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

function HomePage({ updatePage }) {
  // const Auth = true;

  // const showCreateEventButtonIfAuthenticated = () => {
  //   { Auth.loggedIn() ? ( 
  //       <Link to="/create-event">
  //         <button>Create Event</button>
  //       </Link>
  //     ) : ( 
  //       <Link to="/login">
  //         <p>You must login to reate an event</p>
  //         <button>Login</button>
  //       </Link>
  //     );
  // };


  return (
    <div>
      <h1 id="home">Welcome to Gathr</h1>
      <p>
        Have you always wanted to host a peanut party? Gathr is the place to be!
        Peanut peanut peanut peanut peanut peanut peanut peanut peanut peanut
        peanut peanut peanut peanut peanut peanut peanut peanut peanut peanut
        peanut peanut peanut peanut peanut peanut peanut peanut peanut peanut
        peanut peanut peanut peanut peanut peanut peanut peanut peanut peanut
        peanut peanut peanut peanut peanut peanut peanut peanut peanut peanut
        peanut peanut peanut peanut peanut peanut peanut peanut peanut peanut
        peanut peanut peanut peanut peanut peanut
      </p>
      <h3>Host, Plan, Gather</h3>
      {/* {showCreateEventButtonIfAuthenticated()} */}
      { Auth.loggedIn() ? ( 
        <Link to="/create-event">
          <button>Create Event</button>
        </Link>
      ) : ( 
        <Link to="/login">
          <p>You must login to reate an event</p>
          <button>Login</button>
        </Link>
      )}
    </div>
  );
}

export default HomePage;
