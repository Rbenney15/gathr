import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Login from "../src/components/Login";
import Signup from "./components/signup";

import Nav from "./components/navbar";
import HomePage from "./components/homepage";
import Footer from "./components/footer";

import UserDash from "./components/dashboard";
import CreateEvent from "./components/EventCreate";
import Event from "./components/event";
import Rsvp from "./components/Rsvp";

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
          <Nav />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/userdash" element={<UserDash />}>
                <Route path="event" element={<Event />} />
                <Route path=":eventId" element={<UserDash />} />
              </Route>
              <Route path="/create-event" element={<CreateEvent />}>
                <Route path=":id" element={<CreateEvent />} />
                <Route path="rsvp" element={<Rsvp />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <Router>
//         <Nav></Nav>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/create-event" element={<CreateEvent />} />
//         </Routes>
//         <Footer />
//         <div>
//         <Rsvp />
//         </div>
//         <div>
//         <UserDash />
//         </div>
//       </Router>
//     </ApolloProvider>
//   );
// }

export default App;
