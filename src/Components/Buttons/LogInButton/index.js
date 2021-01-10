import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import { ThemeContext } from '../../../ThemeContext';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  //set Mui Dark Theme
  const theme = useContext(ThemeContext);
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }
  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant='outlined'
      color={muiTheme(theme)}
    >
      Log In
    </Button>
  );
};

export default LoginButton;
