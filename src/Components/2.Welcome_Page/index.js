import React, { useContext } from 'react';
import H1 from '../DisplayText/H1Text/index';
import SoCLogo from '../Pictures/SocLogo/index';
import LoginButton from '../Buttons/LogInButton/index';
import './WelcomePage.css';
import { ThemeContext } from '../../ThemeContext';

function Welcome() {
  const theme = useContext(ThemeContext);
  return (
    <div id={theme} className={('welcome', 'container')}>
      <H1 text={`Welcome to your SoC Journal`} />
      <SoCLogo style={{ width: '100px' }} />
      <p>
        Your personal space to record your once in a lifetime experience at the
        School of Code!
        <br></br>
        <br></br>
        There will be highs and low, tears and tantrums, but you’re going to
        want to remember it forever. <br></br>
        <br></br>Visit me often to record how much you've grown.
      </p>
      <LoginButton />
    </div>
  );
}

export default Welcome;
