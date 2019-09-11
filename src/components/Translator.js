import React, { useState, useContext, useEffect } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import { UserContext } from './UserContext';
import Translation from './Translation';
// import DictionaryContext from './DictionaryContext';
import { URL } from '../config';
import { languages } from '../data/languages';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    background: 'blue',
  },
  textArea: {
    fontSize: 20,
  },
}));

const Translator = () => {
  const { user } = useContext(UserContext);
  // const { dictionary } = useContext(DictionaryContext);
  const classes = useStyles();
  const [text, setText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('fr');
  const [translations, setTranslations] = useState([]);

  useEffect(() => {
    if (user) {
      setFromLang(user.language_from);
      setToLang(user.language_to);
    }
  }, [user]);

  const handleInput = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const handleSubmit = () => {
    const fetchTranslation = async () => {
      // eslint-disable-next-line prefer-const
      let result = await axios.post(`http://${URL}/translate`, {
        toLang,
        fromLang,
        text,
      });
      result.data.id = Math.random();
      setTranslations((prevState) => [result.data, ...prevState]);
    };
    fetchTranslation();
  };

  const handleLanguages = (e) => {
    const { name, value } = e.target;
    if (name === 'from') {
      setFromLang(value);
    }
    if (name === 'to') {
      setToLang(value);
    }
  };

  const renderLanguages = (lang) => (
    lang.map((l) => (
      <MenuItem
        key={Object.keys(l)[0]}
        value={Object.keys(l)[0]}
      >
        {Object.values(l)[0]}
      </MenuItem>
    ))
  );

  return (
    <div className="main-container">
      {user ? (
        <h4 className="description">
          Hi
          {' '}
          {user.username}
          {' '}
          type a sentence to translate
        </h4>
      )
        : <h4 className="description">Type a sentence to translate</h4>}
      <form className="input">
        <TextareaAutosize
          className={classes.textArea}
          aria-label="minimum height"
          onChange={handleInput}
          name="text-area"
          value={text}
          rows={3}
          cols={100}
          placeholder="What would you like to translate today?"
        />
        <Button color="primary" className={classes.button} onClick={handleSubmit}>
        Translate
        </Button>
      </form>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-simple">
          From
        </InputLabel>
        <Select
          value={fromLang}
          onChange={handleLanguages}
          input={<OutlinedInput labelWidth={30} name="from" id="outlined-age-simple" />}
        >
          {renderLanguages(languages)}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-simple">
          To
        </InputLabel>
        <Select
          value={toLang}
          onChange={handleLanguages}
          input={<OutlinedInput labelWidth={30} name="to" id="outlined-age-simple" />}
        >
          {renderLanguages(languages)}
        </Select>
      </FormControl>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {translations.length
          ? translations.map((t) => <Translation key={t.id} translation={t} user={user} save />)
          : null}
      </Grid>
    </div>
  );
};

export default Translator;
