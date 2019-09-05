import React from 'react';

const Translation = ({
  toLang, fromLang, text, newText,
}) => (
  <div>
    {fromLang}
:
    {' '}
    {text}
    <hr />
    {toLang}
:
    {' '}
    {newText}
  </div>
);

export default Translation;
