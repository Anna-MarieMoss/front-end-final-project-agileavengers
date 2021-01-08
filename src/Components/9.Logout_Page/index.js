import React from 'react';
import LogoutButton from '../Buttons/LogOutButton/index';
import H2 from '../DisplayText/H2Text/index';
import SoCLogo from '../Pictures/SocLogo/index';
import { useAppContext } from '../../AppContext';

function Logout() {
  const { userData, isAuthenticated, isLoading } = useAppContext();

  // if (isLoading) {
  //     return <div>Loading ...</div>;
  //   }

  return (
    <div>
      <H2
        text={`Great Stuff ${userData?.name}! Don't forget to log back in tomorrow to update your journey`}
      />
      <SoCLogo style={{ width: '200px', margin: '20px' }} />
      <br />
      <LogoutButton />
    </div>
  );
}

export default Logout;
