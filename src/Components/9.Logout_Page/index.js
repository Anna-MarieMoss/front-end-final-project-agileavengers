import React from 'react';
import LogoutButton from '../Buttons/LogOutButton/index';
import H1 from '../DisplayText/H1Text/index';
import SoCLogo from '../Pictures/SocLogo/index'
import { useAppContext } from '../../AppContext';

function Logout() {
    const {  user, isAuthenticated, isLoading } = useAppContext();

    if (isLoading) {
        return <div>Loading ...</div>;
      }

  return (
    isAuthenticated && (
    <div>
      <H1 text={`Great Stuff ${user.given_name}! Don't forget to log back in tomorrow to update your journey`} />
      <SoCLogo style={{width: '200px', margin: '20px'}}/>
      <br/>
      <LogoutButton />
    </div>
  )
  )
}

export default Logout;