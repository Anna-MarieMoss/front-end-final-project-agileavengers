import React from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  h5: {
    marginRight: '0.7em',
    marginLeft: '0.7em',
  },
});

function H2({ text }) {
  const classes = useStyles();
  return <Typography variant="h5" className={classes.h5}>{text}</Typography>;
}

export default H2;
