import React from 'react';
import { useAppContext } from '../../AppContext';
import ReactAudioPlayer from 'react-audio-player';

// App Components
import DeleteButton from '../Buttons/DeleteButton/index.js';
import FavoriteButton from '../Buttons/FavouriteButton/index.js';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
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
  date: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    marginLeft: `0em`,
    padding: theme.spacing(2),
    paddingLeft: '0em',
  },
}));

export default function JournalAccordion({
  text,
  emotionNumber,
  journalDate,
  journalEntryId,
  handleDelete,
  handleFavorite,
  favorite,
  audioSource,
  imgSource,
  vidSource,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { emotionsArray } = useAppContext();

  //const [postFavorite, setPostFavorite] = useState(false)
  //

  // Matching the Emoji to Mood Number
  const emotion = emotionsArray.filter((em) => {
    if (em.number === emotionNumber) {
      return true;
    }
    return false;
  });

  // Material UI expand the Acordian Function
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === `panel${journalEntryId}`}
        onChange={handleChange(`panel${journalEntryId}`)}
      >
        <AccordionSummary
          aria-controls={`panel${journalEntryId}bh-content`}
          id={`panel${journalEntryId}bh-header`}
        >
          <div className={classes.root}>
            <Paper elevation={1} className={classes.paper}>
              <Grid container wrap='nowrap'>
                <Grid item>
                {emotionNumber && (
                  <Avatar
                    style={{ backgroundColor: 'white', fontSize: '2em' }}
                    className='journal-mood'
                  >
                    {emotion[0].emotion}
                  </Avatar>
                )}
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography className={classes.date} noWrap>
                    {journalDate}
                  </Typography>
                  <Typography noWrap>{text}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <Card className={classes.root}>
            <Grid item container wrap='nowrap'>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Grid item container wrap='nowrap'>
                    <Typography>{text}</Typography>
                    <FavoriteButton
                      handleFavorite={handleFavorite}
                      favoriteColor={favorite ? '#DC143C' : 'black'}
                      journalEntryId={journalEntryId}
                    />
                    <br />
                    <br />
                    <DeleteButton
                      handleDelete={handleDelete}
                      journalEntryId={journalEntryId}
                    />
                  </Grid>
                </CardContent>

                <div classname='journal-image'>
                  {imgSource && (
                    <img
                      classname='journal-image'
                      src={imgSource}
                      alt='chosenImg'
                      style={{ width: '80%' }}
                    />
                  )}
                </div>

                <div classname='journal-video'>
                  {vidSource && (
                    <video
                      src={vidSource}
                      alt='chosenVideo'
                      style={{ width: '80%' }}
                      controls
                    />
                  )}
                </div>

                <div classname='journal-audio'>
                  {audioSource && (
                    <ReactAudioPlayer
                      src={audioSource}
                      alt='chosenAudio'
                      style={{ width: '80%' }}
                      autoplay
                      controls
                    />
                  )}
                </div>
              </div>
            </Grid>
          </Card>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

//<CardMedia
{
  /* <div classname='journal-image'>
{imgSource && (
  <img
    classname='journal-image'
    src={imgSource}
    alt='chosenImg'
    style={{ width: '70%' }}
  />
)}
</div>

<div classname='journal-video'>
{vidSource && (
<video
  src={vidSource}
  alt='chosenVideo'
  style={{ width: '70%' }}
  controls
/>
)}
</div>

<div classname='journal-audio'>
{audioSource && (
<ReactAudioPlayer
  src={audioSource}
  alt='chosenAudio'
  style={{ width: '70%' }}
  autoplay
  controls
/>
)}</div>
/> */
}
