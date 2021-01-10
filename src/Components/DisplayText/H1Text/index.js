import React from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  h4: {
    marginTop: '0.25em',
    marginBottom: '0.5em',
  },
});

function H1({ text }) {
  const classes = useStyles();
  return <Typography variant="h4" className={classes.h4}>{text}</Typography>;
}

export default H1;