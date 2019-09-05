import React, { useState, useMemo } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Main from './components/Main';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Dictionary from './components/Dictionary';
import { UserContext } from './components/UserContext';

const App = () => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <NavBar />
        <Router>
          <Main path="/" />
          <Dictionary path="/dictionary" />
          <Login path="/login" />
          <Register path="/register" />
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
