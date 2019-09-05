import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { Link, navigate } from '@reach/router';
import { UserContext } from './UserContext';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const NavBar = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              style={{ textDecoration: 'none', color: 'white' }}
            >
            Translatr
            </Link>
          </Typography>
          {!user ? (
            <>
              {' '}
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
              {' '}

            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
              <Button color="inherit" component={Link} to="/dictionary">Dictionary</Button>

            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
