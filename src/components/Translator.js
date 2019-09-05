import React, { useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    background: 'blue',
  },
}));

const Translator = () => {
  const classes = useStyles();
  const [text, setText] = useState('i like food');
  const [translation, setTranslation] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('es');

  const handleInput = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const handleSubmit = () => {
    const fetchTranslation = async () => {
      const result = await axios.post('http://35.153.208.107/translate', {
        toLang,
        fromLang,
        text,
      });
      setTranslation(result.data.new_text);
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

  return (
    <div className="main-container">
      <h4 className="description">Type a sentence to translate</h4>
      <form className="input">
        <TextareaAutosize aria-label="minimum height" onChange={handleInput} name="text-area" value={text} rows={3} cols={100} placeholder="What would you like to translate today?" />
        <Button color="primary" className={classes.button} onClick={handleSubmit}>
        Translate
        </Button>
      </form>
      <p>{translation}</p>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-simple">
          From
        </InputLabel>
        <Select
          value={fromLang}
          onChange={handleLanguages}
          input={<OutlinedInput labelWidth={30} name="from" id="outlined-age-simple" />}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="fr">French</MenuItem>
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
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="fr">French</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Translator;
