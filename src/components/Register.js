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

const Register = () => {
  const classes = useStyles();
  const [registerInfo, setRegisterInfo] = useState({ username: '', password: '', confirmPassword: '' });
  const { setUser } = useContext(UserContext);

  const handleChange = (name) => (event) => {
    setRegisterInfo({ ...registerInfo, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    await axios.post(`http://${URL}/register`, {
      username: registerInfo.username,
      password: registerInfo.password,
      confirmPassword: registerInfo.confirmPassword,
    }).then((resp) => {
      setUser(resp.data.user);
      localStorage.setItem('token', resp.data.access_token);
      localStorage.setItem('id', resp.data.user.id);
    }).then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      Register PAGE
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Username"
          className={classes.textField}
          value={registerInfo.username}
          onChange={handleChange('username')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          value={registerInfo.password}
          onChange={handleChange('password')}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-confirm-password-input"
          label="ConfirmPassword"
          className={classes.textField}
          value={registerInfo.confirmPassword}
          onChange={handleChange('confirmPassword')}
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

export default Register;
