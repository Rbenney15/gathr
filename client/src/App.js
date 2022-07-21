import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import LoginForm from '../src/components/LoginForm';
import Nav from './components/navbar';
import HomePage from './components/homepage';
import Signup from './components/signup';
import UserDash from './components/dashboard';
import CreateEvent from './components/EventCreate';
import Rsvp from './components/Rsvp';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Nav></Nav>
      <Routes>
        <Route 
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/login'
          element={<LoginForm />}
        />
        <Route
        path='/signup'
        element={<Signup />}
        />
        <Route
          path='/create-event'
          element={<CreateEvent />}
        />
      </Routes>
      <UserDash />
    </Router>
    </ApolloProvider>

  );
}

export default App;
