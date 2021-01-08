import React, { useContext } from 'react';
import LoginButton from '../Buttons/LogInButton/index';
import H1 from '../DisplayText/H1Text/index';
import SoCLogo from '../Pictures/SocLogo/index';
import { ThemeContext } from '../../ThemeContext';
import css from './Login.css';
import '../../App.css';

function LogIn() {
  const theme = useContext(ThemeContext);

  return (
    <div id={theme} className={css.login}>
      <H1 text={`Welcome to your SoC Journal`} />
      <SoCLogo style={{ width: '200px', margin: '20px' }} />
      <br />
      <LoginButton />
    </div>
  );
}

export default LogIn;
