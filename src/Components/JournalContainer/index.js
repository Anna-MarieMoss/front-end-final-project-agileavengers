import React from 'react';
import { useAppContext } from '../../AppContext';
import './JournalContainer.css'

// App Components
import DeleteButton from "../Buttons/DeleteButton/index.js";
import FavoriteButton from "../Buttons/FavouriteButton/index.js";

// Material UI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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

export default function JournalContainer({text, emotionNumber, handleClick, journalDate, index, handleDelete, handleFavorite, favorite}) {
  const classes = useStyles();
  const {emotionsArray} = useAppContext();
  //const [postFavorite, setPostFavorite] = useState(false)

  // Matching the Emoji to Mood Number
  const emotion = emotionsArray.filter(em => {
      if (em.number === emotionNumber){
          return true
      }
      return false
  })

  return (
    <div className={classes.root} >
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item onClick={handleClick}>
            <Avatar className='journal-mood'>{emotion[0].emotion}</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth onClick={handleClick}>
            <p className='journal-date'>{journalDate}</p>
            <Typography noWrap>{text}</Typography>
          </Grid>
          <Grid item className='journal-actions'>
            <FavoriteButton handleFavorite={handleFavorite} key={index} favoriteColor={favorite? '#DC143C' : 'black'}/>
            <br/>
            <br/>
            <DeleteButton handleDelete={handleDelete} key={index}/>
          </Grid>
        </Grid>
      </Paper>  
    </div>
  );
}