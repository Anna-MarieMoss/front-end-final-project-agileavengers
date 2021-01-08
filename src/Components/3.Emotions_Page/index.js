<<<<<<< HEAD
import React, { useEffect, useState, useContext } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> devBranch
import EmotionsButton from '../Buttons/EmotionsButtons';
import quoteData from './quotesData.js';
import './EmotionsPage.css';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text';
import H2 from '../DisplayText/H2Text';
import { useHistory } from 'react-router';
<<<<<<< HEAD
import { ThemeContext } from '../../ThemeContext';
=======

>>>>>>> devBranch
//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Emotions() {
  const theme = useContext(ThemeContext);
  console.log(BACKEND_URL);
  // need user_id from ContextProvider

  const {
    emotionsArray,
    isAuthenticated,
    isLoading,
    accessToken,
  } = useAppContext();
  //need to figure out how to close the ability to click for the day/only enable one click per day
  const [chosenEmotion, setChosenEmotion] = useState(null);
  const history = useHistory();

  function handleEmotion(emotionNum) {
    console.log('running');
    setChosenEmotion(emotionNum);
    console.log(`your chosen emotion is ${chosenEmotion}`);
  }

  // We need to connect to the Database via a valid URL & Need to get the userID & name from the context provider

  useEffect(() => {
    if (chosenEmotion) {
      async function postEmotion() {
<<<<<<< HEAD
        const res = await fetch(
          // neeed to actual API address
          `${BACKEND_URL}/moods`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/JSON',
              Authorization: `Bearer ${accessToken}`,
            },
=======
        const res = await fetch(`${BACKEND_URL}/moods`, {
          method: 'POST',
          headers: {
            'content-type': 'application/JSON',
            Authorization: `Bearer ${accessToken}`,
          },
>>>>>>> devBranch

          body: JSON.stringify({
            user_id: userData?.id,
            mood: chosenEmotion,
          }),
        });
        const data = await res.json();
        console.log(data);
      }
      postEmotion();
      history.push('/journalentry');
    }
  }, [chosenEmotion]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className={theme}>
        <H1 text={`Hi ${userData?.name}`} />
        <H2 text={'How are you feeling today?'} />

        <div className='emotionsBar'>
          {emotionsArray.map((emotion) => (
            <EmotionsButton
              text={emotion.emotion}
              handleClick={handleEmotion}
              emotionNumber={emotion.number}
            />
          ))}
        </div>
        <p>{quoteData[Math.floor(Math.random() * quoteData.length)].quote}</p>
      </div>
    )
  );
}

export default Emotions;
