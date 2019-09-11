import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Translation from './Translation';
import DictionaryContext from './DictionaryContext';
import { UserContext } from './UserContext';
import { URL } from '../config';

const useStyles = makeStyles({
  dc: {
    // backgroundColor: 'red',
  },
});

function Dictionary() {
  const classes = useStyles();

  const { dictionary, setDictionary } = useContext(DictionaryContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    const getDict = async () => {
      await axios.get(`http://${URL}/users/translations`, config)
        .then((resp) => {
          setDictionary([...resp.data.translations.reverse()]);
        }).catch((err) => console.log(err));
    };
    getDict();
  }, [user, setDictionary]);


  return (
    <div>
      Dictionary
      {/* <div className="dictionary-translations"> */}
      <div className={classes.dc}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          {dictionary.length
            ? dictionary.map((d) => <Translation key={d.id} translation={d} user={user} del />)
            : null}
        </Grid>
      </div>
    </div>
  );
}

export default Dictionary;
