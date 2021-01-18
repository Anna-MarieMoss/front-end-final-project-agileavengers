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

//Alerts
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const {
    isAuthenticated,
    isLoading,
    accessToken,
    userData,
    submitPost,
    setSubmitPost,
  } = useAppContext();
  const [journalDisplay, setJournalDisplay] = useState([]);
  const [journalDelete, setJournalDelete] = useState(false);
  const [journalDeleteId, setJournalDeleteId] = useState(null);
  const [sortConstraint, setSortConstraint] = useState('Newest to oldest');
  const [showFavorites, setShowFavorites] = useState(false);
  const [reloadJournal, setreloadJournal] = useState(false);
  const [trophyAwarded, setTrophyAwarded] = useState('');
  const theme = useContext(ThemeContext);
  const history = useHistory();

  let userId = userData?.id;

  //Material UI
  const classes = useStyles();

  if (!isAuthenticated) {
    history.push('/');
  }

  function calculateStreak(payload) {
    let currentDate = new Date();
    let currentDay = currentDate.toDateString().substring(0, 3);
    let latestPostDate = new Date(payload[payload.length - 1].date);
    let latestPostDay = latestPostDate.toDateString().substring(0, 3);
    let oneDay = 1000 * 60 * 60 * 24;
    let streak = 0;
    let delay = 0;
    for (let i = 0; i < payload.length; i++) {
      let postDate = new Date(payload[payload.length - 1 - i].date);
      let postDay = postDate.toDateString().substring(0, 3);

      console.log('day is: ', postDay);
      console.log(
        'currentDate: ',
        currentDate + `${-1 * (streak + delay)}`,
        'postDate:',
        postDate
      );

      if (
        i === 0 &&
        Math.round(
          (currentDate.getTime() -
            postDate.getTime() -
            oneDay * (streak + delay)) /
            oneDay
        ) === 0
      ) {
        delay--;
      }

      var daysBetweenPosts = Math.round(
        (currentDate.getTime() -
          postDate.getTime() -
          oneDay * (streak + delay)) /
          oneDay
      ); // take a look

      console.log(
        'current date day, last post day: ',
        currentDate.getTime() / oneDay - 18641,
        postDate.getTime() / oneDay - 18641
      );
      console.log('days between posts:', Math.abs(daysBetweenPosts));
      if (
        Math.abs(daysBetweenPosts) === 1 ||
        postDay === 'Sun' ||
        postDay === 'Fri'
      ) {
        streak++;
        console.log('streak:', streak);
        console.log('days and day: ', daysBetweenPosts, postDay);
      } else if (Math.abs(daysBetweenPosts) === 2 && postDay === 'Sat') {
        streak++;
        delay++;
        console.log('streak:', streak);
        console.log('delay:', delay);
      } else if (
        Math.abs(daysBetweenPosts) >= 2 &&
        postDay !== 'Sat' &&
        postDay !== 'Sun'
      ) {
        break;
      }
    }
    console.log('submitPost is: ', submitPost);
    if (submitPost) {
      let streaks = [5, 20, 80];
      if (streak === 1 && payload.length === 1) {
        setTrophyAwarded('1 Day Streak');
        toast(
          `Well done on your first post! You've been awarded a trophy! 🎉`,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      } else if (streaks.includes(streak)) {
        setTrophyAwarded(`${streak} Day Streak`);
        toast(`You've been awarded the ${streak} Day Streak trophy! 🎉`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast(`You're on a ${streak} day posting streak! Keep it up! 🎉`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setSubmitPost(false);
    }
  }

  useEffect(() => {
    if (trophyAwarded !== '') {
      async function patchTrophyByUserIdAndName() {
        const res = await fetch(
          `${BACKEND_URL}/trophies/${userId}/${trophyAwarded}`,
          {
            method: 'PATCH',
            headers: {
              'content-type': 'application/JSON',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();
        console.log('patch data is: ', data);
      }
      patchTrophyByUserIdAndName();
    }
  }, [trophyAwarded]);

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
        console.log(
          payload.sort((a, b) => new Date(a.date) - new Date(b.date))
        );
        // calculates streak if first post of the day
        if (
          payload[payload.length - 1]?.date !==
          payload[payload.length - 2]?.date
        ) {
          calculateStreak(
            payload.sort((a, b) => new Date(a.date) - new Date(b.date))
          );
        }

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
      <div style={{ paddingBottom: '100px' }}>
        <NavTop />
        <ToastContainer
          transition={Slide} // changes the transition to a slide rather than a bounce.  Alerts are rendering multiple times at the moment due to the page re redering all of the buttons.  Look into how you can stop this happening but keeep the cool styling tomorrow.
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
              } else if (
                sortConstraint === 'Newest to oldest' &&
                new Date(a.date) - new Date(b.date) === 0
              ) {
                return b.id - a.id;
              } else if (sortConstraint === 'Newest to oldest') {
                return new Date(b.date) - new Date(a.date);
              } else if (
                sortConstraint === 'Oldest to newest' &&
                new Date(a.date) - new Date(b.date) === 0
              ) {
                return b.id - a.id;
              } else if (sortConstraint === 'Oldest to newest') {
                return new Date(a.date) - new Date(b.date);
              } else {
                return b.id - a.id;
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
