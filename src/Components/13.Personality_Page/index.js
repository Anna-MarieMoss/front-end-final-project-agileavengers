import React from 'react';
import { useAppContext } from '../../AppContext';
import PersonalityDisplay from '../DisplayText/DialogBox/index.js';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';
import { useHistory } from 'react-router';
import personalities from './personalities.js';
import H1 from '../DisplayText/H1Text/index';
import { Typography } from '@material-ui/core';

export default function Personalities() {

  const { isAuthenticated } = useAppContext();
  const history = useHistory();


  if (!isAuthenticated) {
    history.push('/');
  }

  return (
    isAuthenticated && (
      <div>
        <NavTop />
        <div
          style={{
            paddingBottom: '100px',
            paddingRight: '2em',
            paddingLeft: '2em',
          }}
        >
          <H1 text='Myers-Briggs' />
          <Typography variant='subtitle2'>
            Check what different Myers-Briggs are like to work with
          </Typography>
          {personalities.map((personality) => (
            <PersonalityDisplay personality={personality} />
          ))}
        </div>
        <NavBar />
      </div>
    )
  );
}
