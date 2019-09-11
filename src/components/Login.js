import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { navigate } from '@reach/router';
import { UserContext } from './UserContext';
import { URL } from '../config';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const { setUser } = useContext(UserContext);

  const handleChange = (name) => (event) => {
    setUserInfo({ ...userInfo, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    await axios.post(`http://${URL}/login`, {
      username: userInfo.username,
      password: userInfo.password,
    }).then((resp) => {
      setUser(resp.data.user);
      localStorage.setItem('token', resp.data.access_token);
      localStorage.setItem('id', resp.data.user.id);
    }).then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      LOGIN PAGE
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Username"
          className={classes.textField}
          value={userInfo.username}
          onChange={handleChange('username')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          value={userInfo.password}
          onChange={handleChange('password')}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <Button color="primary" className={classes.button} onClick={handleSubmit}>
        Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
