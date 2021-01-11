import React, {useEffect, useState} from 'react';
import { useAppContext } from '../../AppContext';
import ReactAudioPlayer from 'react-audio-player';
import { journalEntryWeek } from '../../journalWeek';

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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextFieldsRoundedIcon from '@material-ui/icons/TextFieldsRounded';
import AudiotrackRoundedIcon from '@material-ui/icons/AudiotrackRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import PhotoRoundedIcon from '@material-ui/icons/PhotoRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // flexGrow: 1,
    // overflow: 'hidden',
    // padding: theme.spacing(0, 3),
    marginTop: '1em',
  },
  date: {
    maxWidth: '95%',
    // margin: `${theme.spacing(1)}px auto`,
    // marginLeft: `0em`,
    //padding: theme.spacing(1),
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    align: 'left',
    //padding: '1em',
  },
  summary: {
    width: '95%',
    padding: theme.spacing(1),
  }, 
  icons: {
    width: '25%',
    padding: theme.spacing(1),
  },
  journaltext: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: theme.spacing(1),
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
  avatarBackground,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { emotionsArray, userData } = useAppContext();
  const [journalWeek, setJournalWeek] = useState("week1")
  //const [summaryText, setSummaryText] = useState("");

  //const [postFavorite, setPostFavorite] = useState(false)
  //

  //Figuring out week - ASK Isabel
//   useEffect(() =>{  
//     if (journalDate){
//     let week = journalEntryWeek(userData?.start_date, journalDate)
//     setJournalWeek(week);
//   }
// }, [])
//   console.log(journalWeek)

  // Matching the Emoji to Mood Number
  const emotion = emotionsArray.filter((em) => {
    if (em.number === emotionNumber) {
      return true;
    }
    return false;
  });
function getSummaryText(){
  if (text){
    if (text.length < 20){
      return text;
    }else{
      return text.slice(0, 20)
    }
  }
  return "";
}
let summaryText = getSummaryText()

//Date Format
function getLongDate(){
  let newDate = new Date(journalDate);
  newDate = newDate.toString();
return newDate.slice(0, 15);
}
let date = getLongDate();


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
              <Grid container wrap='nowrap'>
                <Grid item >
                {emotionNumber && (
                  <Avatar
                    style={{ backgroundColor: "white", fontSize: '2em', strokeOpacity: '0' }}
                    className='journal-mood'
                  >
                    {emotion[0].emotion}
                  </Avatar>
                )}
                </Grid>
                <Grid item xs zeroMinWidth >
                  <Typography className={classes.date} >
                    {date}
                  </Typography>
                  {expanded ? "": <Typography className={classes.summary}  >{`${summaryText}...`}</Typography>}
                </Grid>
                <Grid className={classes.icons}>
                  {text && (
                    <TextFieldsRoundedIcon fontSize='small'/>
                  )}
                  {imgSource && (
                    <PhotoRoundedIcon fontSize='small'/>
                  )}
                  {vidSource && (
                    <VideocamRoundedIcon fontSize='small'/>
                  )}
                  {audioSource && (
                    <AudiotrackRoundedIcon fontSize='small'/>
                  )}
                </Grid>
              </Grid>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <Card className={classes.root}>
            <Grid item container wrap='nowrap'>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Grid className={'journaltext'} item container wrap='nowrap'>
                    <Typography align='center' display={'inline'}>{text}</Typography>
                  </Grid>
                </CardContent>
                <div classname='journal-image'>
                  {imgSource && (
                    <img
                      classname='journal-image'
                      src={imgSource}
                      alt='chosenImg'
                      style={{ width: '100%' }}
                    />
                  )}
                </div>

                <div classname='journal-video'>
                  {vidSource && (
                    <video
                      src={vidSource}
                      alt='chosenVideo'
                      style={{ width: '100%' }}
                      controls
                    />
                  )}
                </div>

                <div classname='journal-audio'>
                  {audioSource && (
                    <ReactAudioPlayer
                      src={audioSource}
                      alt='chosenAudio'
                      style={{ width: '100%' }}
                      autoplay
                      controls
                    />
                  )}
                </div>
              </div>
            </Grid>
            <Grid>
                    <FavoriteButton
                      handleFavorite={handleFavorite}
                      favoriteColor={favorite ? '#DC143C' : 'black'}
                      journalEntryId={journalEntryId}
                      favorite={favorite}
                    />
                    <DeleteButton
                      handleDelete={handleDelete}
                      journalEntryId={journalEntryId}
                    />
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
