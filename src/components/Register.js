import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { navigate } from '@reach/router';
import { UserContext } from './UserContext';


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
  const { user, setUser } = useContext(UserContext);

  const handleChange = (name) => (event) => {
    setRegisterInfo({ ...registerInfo, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    await axios.post('http://35.153.208.107/register', {
      username: registerInfo.username,
      password: registerInfo.password,
      confirmPassword: registerInfo.confirmPassword,
    }).then((resp) => setUser(resp.data.user)).then(() => navigate('/'))
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
