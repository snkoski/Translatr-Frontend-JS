import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import DictionaryContext from './DictionaryContext';
import { URL } from '../config';
import { langOb } from '../data/languages';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 800,
    padding: 5,
    margin: 5,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const Translation = ({
  translation, user, save, del,
}) => {
  const classes = useStyles();
  const { dictionary, setDictionary } = useContext(DictionaryContext);
  const [showSave, setShowSave] = useState(save);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    await axios.post(`http://${URL}/save`, {
      fromLang: translation.og_lang,
      newText: translation.new_text,
      text: translation.og_text,
      toLang: translation.new_lang,
    }, config).then((resp) => {
      console.log(resp);
    }).catch((err) => console.log('error', err));
    setDictionary((prevState) => [translation, ...prevState]);
    setShowSave(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    axios.delete(`http://${URL}/delete/${translation.id}`, config).then((resp) => {
      console.log(resp);
    }).catch((err) => console.log('error', err));
    setDictionary((prevState) => prevState.filter((t) => t.id !== translation.id));
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {langOb[translation.og_lang]}
        </Typography>
        <Typography variant="h5" component="h2">
          {translation.og_text}
        </Typography>
        <hr />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {langOb[translation.new_lang]}
        </Typography>
        <Typography variant="h5" component="h2">
          {translation.new_text}
        </Typography>
      </CardContent>
      {user && showSave ? (
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button size="small" onClick={handleSave}>Save</Button>
        </CardActions>
      ) : null}
      {user && del ? (
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button size="small" onClick={handleDelete}>Delete</Button>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default Translation;
