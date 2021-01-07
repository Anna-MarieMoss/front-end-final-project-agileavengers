import React from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  h4: {
    marginRight: '0.7em',
    marginLeft: '0.7em',
  },
});

function H2({ text }) {
  const classes = useStyles();
  return <Typography variant="h4" className={classes.h4}>{text}</Typography>;
}

export default H2;
