import React, { useEffect, useState } from 'react';
import EmotionsButton from '../Buttons/EmotionsButtons';
import quoteData from './quotesData.js';
import './EmotionsPage.css';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text';
import H2 from '../DisplayText/H2Text';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Temp userId
const userId = 1;

function Emotions() {
  console.log(BACKEND_URL);
  // need user_id from ContextProvider
  const { emotionsArray, user, isAuthenticated, isLoading } = useAppContext();
  //need to figure out how to close the ability to click for the day/only enable one click per day
  const [chosenEmotion, setChosenEmotion] = useState(null);

  function handleEmotion(emotionNum) {
    console.log('running');
    setChosenEmotion(emotionNum);
    console.log(`your chosen emotion is ${chosenEmotion}`);
  }

  // We need to connect to the Database via a valid URL & Need to get the userID & name from the context provider

  useEffect(() => {
    if (chosenEmotion) {
      async function postEmotion() {
        const res = await fetch(
          // neeed to actual API address
          `${BACKEND_URL}/moods`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/JSON' },
            body: JSON.stringify({
              user_id: userId,
              mood: chosenEmotion,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        //hopefully returned a unique post numb
      }
      postEmotion();
    }
  }, [chosenEmotion]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <H1 text={`Hi ${user.given_name}`} />
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
