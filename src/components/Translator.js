import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

const Translator = () => (
  <div className="main-container">
    <h4 className="description">Type a sentence to translate</h4>
    <form className="input">
      {/* <label>Translate</label> */}
      {/* <textarea
        rows={10}
        cols={100}
        name="input"
        value={form}
        onChange={handleInput}
      /> */}
      <TextareaAutosize aria-label="minimum height" rows={3} cols={100} placeholder="What would you like to translate today?" />
      <Button color="primary" className={classes.button}>
        Primary
      </Button>
      {/* <button className="btn" type="button" onClick={onButton}>Translate</button> */}
    </form>
    {/* <div className="dropdown-container">
      <button>Translate From</button>
      <button>Translate To</button>
    </div>
    <ul>
      {!!translations.length && translations.map((t, i) => <li key={i}>{t}</li>)}
    </ul> */}
    {/* <Dropdown list={languageList} current={languageList[0]} /> */}
  </div>
);

export default Translator;
