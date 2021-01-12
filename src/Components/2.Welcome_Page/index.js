import React, { useContext } from 'react';
import H1 from '../DisplayText/H1Text/index';
import SoCLogo from '../Pictures/SocLogo/index';
import LoginButton from '../Buttons/LogInButton/index';
import './WelcomePage.css';
import { ThemeContext } from '../../ThemeContext';
import {Typography} from '@material-ui/core';
import NavTop from '../NavTop/index.js';

function Welcome() {
  const theme = useContext(ThemeContext);
  return (
    <div id={theme} className={('welcome', 'container')}>
    <NavTop/>
      <H1 text={`Welcome to your SoC Journal`} />
      <SoCLogo />
      <Typography variant='body2'>
        Your Personal Space to Record Your Once in a Lifetime School of Code Experience!
        <br></br>
        <br></br>
        There Will be Highs, there Will be Lows, Tears and Tantrums, But it Will Fly By and You Will be Amazed at All that You Learn!<br></br>
        <br></br>Record Your Progress and Transformation Here!!
      </Typography>
      <br></br>
      <div width='50%' margin="2em">
      <LoginButton />
      </div>
    </div>
  );
}

export default Welcome;
