import React, { useContext } from 'react';
import H1 from '../DisplayText/H1Text/index';
import Reflect from '../Pictures/Reflect/index';
import { useAppContext } from '../../AppContext';
import { ThemeContext } from '../../ThemeContext';
import '../../App.css';
import './Logout.css';
import NavBar from '../NavBar/NavBar.js';
import NavTop from '../NavTop/index.js';
import { useHistory } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@material-ui/core';

function Logout() {
  const theme = useContext(ThemeContext);
  const { userData, isAuthenticated, isLoading } = useAppContext();
  const { logout } = useAuth0();
  const history = useHistory();

  if (!isAuthenticated) {
    history.push('/');
  }

  const name = userData ? userData?.name : '';

  setTimeout(function () {
    logout({ returnTo: window.location.origin });
  }, 2000);

  return (
    isAuthenticated && (
      <div className={'logout'}>
        <NavTop />
        <div id={theme} className={'container'}>
          <H1 text={`Great Stuff ${name}!`} />
          <Typography variant='h6'>
            Don't forget to log back in tomorrow to update your journey
          </Typography>
          <Reflect style={{ width: '200px', margin: '20px' }} />
          <br />
        </div>
        <NavBar />
      </div>
    )
  );
}

export default Logout;
