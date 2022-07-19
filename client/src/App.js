import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from '../src/components/LoginForm';
import Nav from './components/navbar';
import HomePage from './components/homepage';
// import Signup from './components/Signup';

function App() {

  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({name: "", email: ''});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if (details.email == adminUser.email && details.password == adminUser.password) {
      console.log('Logged In');
      setUser({
        name: details.name,
        emai: details.email
      });
    } else {
      console.log('Details do not match!')
      setError('Details do not match!');
    }
  }

  const Logout = () => {
    setUser({name: "", email: ''});
  }

  return (
    <Router>
      <Nav></Nav>
      <Routes>
        <Route 
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/login'
          element={(user.email != "") ? (
            <div className="welcome">
              <h2>Welcome, <span>{user.name}</span></h2>
              <button onClick={Logout}>Logout</button>
            </div>
            ) : (
            <LoginForm Login={Login} error={error} />
          )}
        />
      </Routes>
    </Router>


  );
}

export default App;
