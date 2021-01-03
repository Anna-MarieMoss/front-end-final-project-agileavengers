import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteButton from "../Buttons/DeleteButton/index.js";
import FavoriteButton from "../Buttons/FavouriteButton/index.js";
import { useAppContext } from '../../AppContext';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,

  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default function JournalAccordion({text, emotionNumber, handleClick, journalDate, index, handleDelete, handleFavorite, favorite}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {emotionsArray} = useAppContext();
  //const [postFavorite, setPostFavorite] = useState(false)
  const emotion = emotionsArray.filter(em => {
      if (em.number === emotionNumber){
          return true
      }
      return false
  })

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
        <AccordionSummary
          aria-controls={`panel${index}bh-content`}
          id={`panel${index}bh-header`}
        >
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
                
                    </Grid>
                </Paper>  
            </div>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Typography>
                {text}
                </Typography>
            </Grid>
            <Grid item className='journal-actions'>
                <FavoriteButton handleFavorite={handleFavorite} key={index} favoriteColor={favorite? '#DC143C' : 'black'}/>
                <br/>
                <br/>
                <DeleteButton handleDelete={handleDelete} key={index}/>
            </Grid>
        </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}