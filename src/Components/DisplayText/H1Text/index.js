import React from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  h3: {
    margin: '0.5em',
  },
});

function H1({ text }) {
  const classes = useStyles();
  return <Typography variant="h3" className={classes.h3}>{text}</Typography>;
}

export default H1;