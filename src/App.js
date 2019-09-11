import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { Router } from '@reach/router';
import axios from 'axios';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Dictionary from './components/Dictionary';
import { UserContext } from './components/UserContext';
import Translator from './components/Translator';
import DictionaryContext from './components/DictionaryContext';
import { URL } from './config';


const App = () => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [dictionary, setDictionary] = useState([]);
  const dValue = useMemo(() => ({ dictionary, setDictionary }), [dictionary, setDictionary]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      const bodyParameters = {
        key: 'value',
      };
      const getUser = async () => {
        await axios.post(`http://${URL}/reauth`, bodyParameters, config)
          .then((resp) => {
            setUser(resp.data.user);
            localStorage.setItem('id', resp.data.user.id);
          }).catch((err) => console.log(err));

        await axios.get(`http://${URL}/users/translations`, config)
          .then((resp) => {
            setDictionary([...resp.data.translations.reverse()]);
          }).catch((err) => console.log(err));
      };
      getUser();
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <DictionaryContext.Provider value={dValue}>
          <NavBar />
          <Router>
            <Translator path="/" />
            <Dictionary path="/dictionary" />
            <Login path="/login" />
            <Register path="/register" />
          </Router>
        </DictionaryContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
