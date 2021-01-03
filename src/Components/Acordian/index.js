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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    maxWidth: 400,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    maxWidth: 400,
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
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}bh-content`}
          id={`panel${index}bh-header`}
        >
          <Avatar className='journal-mood'>{emotion[0].emotion}</Avatar>
          <Typography className={classes.heading}>{journalDate}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {text}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}