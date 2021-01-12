import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeContext } from '../../../ThemeContext';

const useStyles = makeStyles({
  h4: {
    marginTop: '2em',
    marginBottom: '0.5em',
  },
});

function H1({ text }) {
  const classes = useStyles();
  const theme = useContext(ThemeContext);
  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

  return (
    <Typography variant='h4' className={classes.h4} color={muiTheme(theme)}>
      {text}
    </Typography>
  );
}

export default H1;
