import React, { useContext } from 'react';
import LogoutButton from '../Buttons/LogOutButton/index';
import H2 from '../DisplayText/H2Text/index';
import SoCLogo from '../Pictures/SocLogo/index';
import { useAppContext } from '../../AppContext';
import { ThemeContext } from '../../ThemeContext';
import '../../App.css';
import './Logout.css';
import NavBar from '../NavBar/NavBar.js';
import NavTop from '../NavTop/index.js';

function Logout() {
  const theme = useContext(ThemeContext);
  const { userData, isAuthenticated, isLoading } = useAppContext();
  // if (isLoading) {
  //     return <div>Loading ...</div>;
  //   }

  const name = userData ? userData?.name : '';

  return (
    <div className={'logout'}>
    <NavTop />
    <div id={theme} className={'container'}>
      <H2
        text={`Great Stuff ${name}! Don't forget to log back in tomorrow to update your journey`}
      />
      <SoCLogo style={{ width: '200px', margin: '20px' }} />
      <br />
      <LogoutButton className='btn' />
    </div>
    <NavBar />
    </div>
  );
}

export default Logout;
