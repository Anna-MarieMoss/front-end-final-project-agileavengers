import React from 'react';
import { useAppContext } from '../../AppContext';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { isWithinInterval } from 'date-fns';
import './JournalContainer.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default function JournalContainer({text, emotionNumber, handleClick, journalDate, key, test}) {
  const classes = useStyles();
  const {emotionsArray} = useAppContext();
  const emotion = emotionsArray.filter(em => {
      if (em.number === emotionNumber){
          return true
      }
      return false
  })

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar id='journal-mood'>{emotion[0].emotion}</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <p id='journal-date'>{journalDate}</p>
            <Typography noWrap>{text}</Typography>
          </Grid>
        </Grid>
      </Paper>  
    </div>
  );
}