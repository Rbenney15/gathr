import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

import HomePage from "../src/components/Homepage";

import Login from "../src/components/Login";
import Signup from "../src/components/Signup";

import UserDash from "../src/components/Dashboard";
import CreateEvent from "../src/components/EventCreate";
import Event from "../src/components/Event";
import Update from "../src/components/Update";
import Rsvp from "../src/components/Rsvp";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
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
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="dashboard" element={<UserDash />} />
              <Route path="event" element={<Event />} >
                <Route path=":id" element={<Event />} />
              </Route>
              <Route path="update" element={<Update />} >
                <Route path=":id" element={<Update />} />
              </Route>
              <Route path="rsvp" element={<Rsvp />} >
                <Route path=":id" element={<Rsvp />} />
              </Route>
              <Route path="create-event" element={<CreateEvent />}>
                <Route path=":id" element={<CreateEvent />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
