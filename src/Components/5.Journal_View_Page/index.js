import React, { useState, useEffect, useContext } from 'react';
import { useAppContext } from '../../AppContext';
import JournalAccordion from '../Acordian';
import JournalCard from '../journalCard';
import H1 from '../DisplayText/H1Text/index';
import { progressPosition } from '../../progressFunction';
import { ThemeContext } from '../../ThemeContext';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';
import { useHistory } from 'react-router';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, Button, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Material UI Styles
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// get all post
function JournalView() {
  const { isAuthenticated, isLoading, accessToken, userData } = useAppContext();
  const [journalDisplay, setJournalDisplay] = useState([]);
  const [journalDelete, setJournalDelete] = useState(false);
  const [journalDeleteId, setJournalDeleteId] = useState(null);
  const [sortConstraint, setSortConstraint] = useState('Newest to oldest');
  const [showFavorites, setShowFavorites] = useState(false);
  const [reloadJournal, setreloadJournal] = useState(false);
  const theme = useContext(ThemeContext);
  const history = useHistory();

  let userId = userData?.id;

  //Material UI
  const classes = useStyles();

  if (!isAuthenticated) {
    history.push('/');
  }

  useEffect(() => {
    if (userId) {
      async function getJournalById() {
        const res = await fetch(`${BACKEND_URL}/posts/${userId}`, {
          headers: {
            'content-type': 'application/JSON',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // if Access Token Middleware is added to moods and posts BE -need to add header with AT
        const data = await res.json();
        const { payload } = data;
        for (let post of payload) {
          post.date = post.date.slice(0, 10);
        }

        setJournalDisplay(payload);
        setreloadJournal(false);
      }
      getJournalById();
    }
  }, [userData, reloadJournal]);
  //reloadJournal, userId
  function filterByFavorite() {
    setShowFavorites(!showFavorites);
  }

  function changeSortBy(event) {
    setSortConstraint(event.target.value);
  }

  //Delete journal entry
  function handleDelete(postId) {
    console.log('handling delete with postId:', postId);
    setJournalDeleteId(postId);
    setJournalDelete(true);
  }

  useEffect(() => {
    if (!journalDelete) {
      return;
    }
    const abortController = new AbortController();
    fetch(`${BACKEND_URL}/posts/${journalDeleteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/JSON',
        Authorization: `Bearer ${accessToken}`,
      },
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then(() => setJournalDelete(false))
      .catch((e) => {
        console.error(e);
        setJournalDelete(false);
      })
      .then(() => {
        setreloadJournal(true);
      });
    return () => abortController.abort();
  }, [journalDelete]);

  //Patch favourite journal entry
  function handleFavorite(postId, favorite) {
    console.log(favorite);
    async function patchFave() {
      const res = await fetch(`${BACKEND_URL}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/JSON',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          favorite: favorite,
        }),
      });
      const data = await res.json();
      console.log(data);
    }
    patchFave();
    setreloadJournal(true);
  }

  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div style={{paddingBottom: '100px'}}>
        <NavTop />
        <H1 text={`Your Timeline`} />
        <Button
          onClick={filterByFavorite}
          style={{ textTransform: 'capitalize' }}
          variant='outlined'
          color={muiTheme(theme)}
        >
          {showFavorites ? 'Show All ✏️' : 'Show Favorites ❤️'}
        </Button>
        <br></br>
        <FormControl className={classes.formControl}>
          <InputLabel color={muiTheme(theme)} id='sort-by'>
            Sort By...
          </InputLabel>
          <Select
            labelId='sort-by'
            id='sort-by-select'
            value={sortConstraint}
            onChange={changeSortBy}
            color={muiTheme(theme)}
          >
            <MenuItem value={'Newest to oldest'}>Newest to Oldest</MenuItem>
            <MenuItem value={'Oldest to newest'}>Oldest to Newest</MenuItem>
            <MenuItem value={'Mood high to low'}>Mood: 😍 to 😢</MenuItem>
            <MenuItem value={'Mood low to high'}>Mood: 😢 to 😍</MenuItem>
          </Select>
        </FormControl>
        <div className='jouranal-cards'>
          {journalDisplay
            .filter((x) => !showFavorites || x.favorite === true)
            .sort((a, b) => {
              if (sortConstraint === 'Mood high to low') {
                return b.mood - a.mood;
              } else if (sortConstraint === 'Mood low to high') {
                return a.mood - b.mood;
              } else if (sortConstraint === 'Newest to oldest') {
                return new Date(b.date) - new Date(a.date);
              } else if (sortConstraint === 'Oldest to newest') {
                return new Date(a.date) - new Date(b.date);
              } else {
                return new Date(b.date) - new Date(a.date);
              }
            })
            .map((journalEntry, index) => (
              <JournalCard
                text={journalEntry.text}
                emotionNumber={journalEntry.mood}
                journalDate={journalEntry.date}
                journalEntryId={journalEntry.id}
                favorite={journalEntry.favorite}
                handleFavorite={handleFavorite}
                handleDelete={handleDelete}
                audioSource={journalEntry.audio}
                imgSource={journalEntry.image}
                vidSource={journalEntry.video}
                // avatarBackground={themeDark ? '#303030' : '#fafafa'}
                key={index}
              />
            ))}
        </div>
        <NavBar />
      </div>
    )
  );
}
export default JournalView;
