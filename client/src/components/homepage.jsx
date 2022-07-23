import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

function HomePage({ updatePage }) {
  const authenticated = true;

  const showCreateEventButtonIfAuthenticated = () => {
    if (authenticated) {
      return (
        <Link to="/create-event">
          <button>Create Event</button>
        </Link>
      );
    } else {
      return (
        <Link to="/login">
          <button>Log in to create an event</button>
        </Link>
      );
    }
  };
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
      {showCreateEventButtonIfAuthenticated()}
    </div>
  );
}

export default HomePage;
