import React, { useEffect, useState, useContext } from 'react';
import { useAppContext } from '../../AppContext';
// import { Trophies } from './Trophies.js'; //need to add additional trophies to this file
import TrophyButton from '../Buttons/TrophyButton/index';
import H1 from '../DisplayText/H1Text/index';
import { ThemeContext } from '../../ThemeContext';
import '../../App.css';
import './trophies.css';
import { ToastContainer, Slide } from 'react-toastify';
import { Typography } from '@material-ui/core';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { displayNotification } from '../../../public/index.html';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function PushNotifications() {
  const theme = useContext(ThemeContext);
  const { userData, isAuthenticated, isLoading, accessToken } = useAppContext();
  const history = useHistory();

  if (!isAuthenticated) {
    history.push('/');
  }
  //   let user_Id = userData?.id; //we need to get this from the app context

  // function to submit the text and uploaded file's to the server...
  const handleClick = (e) => {
    console.log('triggering push notifications');
    e.preventDefault();
    displayNotification();
  };

  return (
    isAuthenticated && (
      <div className={'notifications'}>
        <NavTop />
        <div className='container'>
          <H1 text={`Push Notifications Demo`} />
          <Typography variant='h6'>
            To keep bootcampers engaged and returning to the app our aim is to
            schedule regular push notifications directly to their phone
            regardless of if they are online or not. Here are a few examples of
            notifications that have been built.
          </Typography>
          <br></br>

          {/* /// see if you can trigger the service worker notifications from here!!! */}
          <Button
            onClick={() => handleClick()}
            variant='outlined'
            className='btn'
            color={muiTheme(theme)}
          >
            Reminder...
          </Button>
        </div>
        <NavBar />
      </div>
    )
  );
}

export default PushNotifications;
