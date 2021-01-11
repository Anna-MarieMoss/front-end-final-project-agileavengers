import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeContext } from '../../../ThemeContext';

const useStyles = makeStyles({
  h5: {
    marginRight: '0.7em',
    marginLeft: '0.7em',
  },
});

function H2({ text }) {
  const classes = useStyles();
  const theme = useContext(ThemeContext);
  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

  return (
    <Typography variant='h5' className={classes.h5} color={muiTheme(theme)}>
      {text}
    </Typography>
  );
}

export default H2;
