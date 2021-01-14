import React, { useContext } from 'react';
import H1 from '../DisplayText/H1Text/index';
import Reflect from '../Pictures/Reflect/index';
import LoginButton from '../Buttons/LogInButton/index';
import './WelcomePage.css';
import { ThemeContext } from '../../ThemeContext';
import TopNav from '../NavTop/index';
import { Typography } from '@material-ui/core';

function Welcome() {
  const theme = useContext(ThemeContext);
  return (
    <div id={theme} className={'welcome'}>
      <TopNav />
      <div className='container'>
        <H1 text={`Welcome to your SoC Journal`} />
        <Reflect />
        <Typography variant='body2'>
          Your personal space to record your once in a lifetime School of Code
          experience!
          <br></br>
          <br></br>
          There will be highs, there will be lows, tears and tantrums, but it
          will fly by and you will be amazed at all that you learn!<br></br>
          <br></br>Record your progress and transformation here!!
        </Typography>
        <br></br>
        <div width='50%' margin='2em'>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
