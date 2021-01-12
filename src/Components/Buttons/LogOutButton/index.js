import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import { ThemeContext } from '../../../ThemeContext';

const LogoutButton = () => {
  const { logout } = useAuth0();
  const theme = useContext(ThemeContext);
  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }
  return (
    <Button
      onClick={() => logout({ returnTo: window.location.origin })}
      variant='outlined'
      color={muiTheme(theme)}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
