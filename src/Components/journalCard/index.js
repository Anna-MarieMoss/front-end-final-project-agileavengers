import React, { useContext } from 'react';
import { useAppContext } from '../../AppContext';
import ReactAudioPlayer from 'react-audio-player';
import Linkify from 'react-linkify';

// App Components
import DeleteButton from '../Buttons/DeleteButton/index.js';
import FavoriteButton from '../Buttons/FavouriteButton/index.js';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ThemeContext } from '../../ThemeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '1em',
  },
  date: {
    maxWidth: '95%',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    align: 'left',
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
    fontWeight: 400,
  },
  media: {
    margin: '1em',
  },
  journalactions: {
    width: '100%',
    alignContent: 'space-between',
    alignItems: 'stretch',
    justify: 'space-between',
    spacing: 3,
  },
  // avatar: {
  //   width: '100%',
  // },
}));

export default function JournalCard({
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
  const { emotionsArray } = useAppContext();

  // Matching the Emoji to Mood Number
  const emotion = emotionsArray.filter((em) => {
    if (em.number === emotionNumber) {
      return true;
    }
    return false;
  });

  //Date Format
  function getLongDate() {
    let newDate = new Date(journalDate);
    newDate = newDate.toString();
    return newDate.slice(0, 15);
  }
  let date = getLongDate();

  const theme = useContext(ThemeContext);

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia>
            <div className={classes.root}>
              <div classname='journal-image' className={classes.media}>
                {imgSource && (
                  <img
                    classname='journal-image'
                    src={imgSource}
                    alt='chosenImg'
                    style={{ width: '100%' }}
                  />
                )}
              </div>

              <div classname='journal-video' className={classes.media}>
                {vidSource && (
                  <video
                    src={vidSource}
                    alt='chosenVideo'
                    style={{ width: '100%' }}
                    controls
                  />
                )}
              </div>

              <div classname='journal-audio' className={classes.media}>
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
          </CardMedia>
          <CardContent>
            <Grid>
              <Typography gutterBottom variant='h5' component='h4'>
                {date}
              </Typography>
              {emotionNumber && (
                <p
                  id={theme}
                  style={{
                    fontSize: '3em',
                    strokeOpacity: '0',
                    backgroundColor: 'transparent',
                  }}
                  class='journal-mood'
                >
                  {emotion[0].emotion}
                </p>
              )}
            </Grid>
            <Typography variant='h6' component='h6' className='journaltext'>
              <Linkify
                componentDecorator={(decoratedHref, decoratedText, key) => (
                  <a target='blank' href={decoratedHref} key={key}>
                    {decoratedText}
                  </a>
                )}
              >
                {text}
              </Linkify>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid className={classes.journalactions}>
            <FavoriteButton
              className={classes.journalactionsicons}
              handleFavorite={handleFavorite}
              journalEntryId={journalEntryId}
              favorite={favorite}
            />
            <DeleteButton
              className={classes.journalactionsicons}
              handleDelete={handleDelete}
              journalEntryId={journalEntryId}
            />
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}
