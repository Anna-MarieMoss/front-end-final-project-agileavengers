import React, { useContext } from 'react';
import H1 from '../DisplayText/H1Text/index';
import SoCLogo from '../Pictures/SocLogo/index';
import LoginButton from '../Buttons/LogInButton/index';
import './WelcomePage.css';
import { ThemeContext } from '../../ThemeContext';

function Welcome() {
  const theme = useContext(ThemeContext);
  return (
    <div id={theme} className={'welcome'}>
      <H1 text={`Hi welcome to your SoC Journal`} />
      <SoCLogo style={{ width: '100px' }} />
      <p>
        Your personal space to record your once in a lifetime School of Code
        experience!
      </p>
      <p>
        There will be highs and low, tears and tantrums, but you’re going to
        want to remember this experience and how you grew forever.
      </p>
      <LoginButton />
    </div>
  );
}

export default Welcome;
