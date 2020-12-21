import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import DeleteButton from './Components/Buttons/DeleteButton';
import FavoriteButton from './Components/Buttons/FavouriteButton';
import MaterialUIPickers from './Components/Input/DateInput';
import SimpleBottomNavigation from './Components/NavBar';
import SubmitButton from './Components/Buttons/SubmitButton';
import Welcome from './Components/2.Welcome_Page/index';
import Profile from './Components/1b.Profile/index';
import Emotions from './Components/3.Emotions_Page/index';
import JournalEntry from './Components/4.Journal_Entry_Page/index';
import Trophy from './Components/7.Trophy_Page/index';
import Timeline from './Components/9.Timeline_Page/index';
import Stats from './Components/8.Stats_Page/index';

function App() {
  return (
    <div className='App'>
      <p>Hello World</p>
      <DeleteButton deleteColor='#f39a9d' />
      <DeleteButton deleteColor='#3f6c51' />
      <FavoriteButton favoriteColor='#301a4b' />
      <FavoriteButton favoriteColor='red' />
      <SubmitButton submitColor='#f39a9d' />
      <MaterialUIPickers />
      <SimpleBottomNavigation />

      <Welcome />
      <Profile />
      <Emotions />
      <JournalEntry />
      <Trophy />
      <Timeline />
      <Stats />
    </div>
  );
}

export default App;
