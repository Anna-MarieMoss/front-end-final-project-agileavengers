import React, { useEffect, useState, useContext } from 'react';
import EmotionsButton from '../Buttons/EmotionsButtons';
import quoteData from './quotesData.js';
import './EmotionsPage.css';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text';
import H2 from '../DisplayText/H2Text';
import { useHistory } from 'react-router';
import { ThemeContext } from '../../ThemeContext';
import JournalEntry from '../4.Journal_Entry_Page/index.js';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  h6: {
    padding: '1.5em',
  },
});

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Emotions() {
  const theme = useContext(ThemeContext);
  console.log(BACKEND_URL);
  const classes = useStyles();
  // need user_id from ContextProvider

  const {
    emotionsArray,
    isAuthenticated,
    isLoading,
    accessToken,
    userData,
  } = useAppContext();
  //need to figure out how to close the ability to click for the day/only enable one click per day
  const [chosenEmotion, setChosenEmotion] = useState(null);
  const history = useHistory();
  const [emotionChosen, setEmotionChosen] = useState(false);

  function handleEmotion(emotionNum) {
    console.log('running');
    setChosenEmotion(emotionNum);
    setEmotionChosen(true);
    console.log(`your chosen emotion is ${chosenEmotion}`);
  }

  // We need to connect to the Database via a valid URL & Need to get the userID & name from the context provider

  // useEffect(() => {
  //   if (chosenEmotion) {
  //     async function postEmotion() {
  //       const res = await fetch(`${BACKEND_URL}/moods`, {
  //         method: 'POST',
  //         headers: {
  //           'content-type': 'application/JSON',
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //         body: JSON.stringify({
  //           user_id: userData?.id,
  //           mood: chosenEmotion,
  //         }),
  //       });
  //       const data = await res.json();
  //       console.log(data);
  //     }
  //     postEmotion();
  //     history.push('/journalentry');
  //   }
  // }, [chosenEmotion]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <div className={theme}>
        <NavTop />
          <div >
            {!chosenEmotion && (
              <div>
                <H1 text={`Hi ${userData?.name}`} />
                <H2 text={'How are you feeling today?'} />
                <div className='emotionsBar'>
                  {emotionsArray.map((emotion) => (
                    <EmotionsButton
                      text={emotion.emotion}
                      handleClick={handleEmotion}
                      emotionNumber={emotion.number}
                      key={emotion.number}
                    />
                  ))}
                </div>
                <Typography variant='h6' className={classes.h6}>
                  {
                    quoteData[Math.floor(Math.random() * quoteData.length)]
                      .quote
                  }
                </Typography>
              </div>
            )}
            {chosenEmotion && <JournalEntry emotion={chosenEmotion} />}
          </div>
        </div>
        <NavBar />
      </div>
    )
  );
}

export default Emotions;
