import React, { useContext } from 'react';
import Translator from './Translator';
import TranslationList from './TranslationList';
import { UserContext } from './UserContext';

function Main() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <Translator />
      <TranslationList />
    </div>
  );
}

export default Main;
