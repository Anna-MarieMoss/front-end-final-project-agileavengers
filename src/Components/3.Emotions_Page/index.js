import React, {useEffect, useState} from 'react';
import EmotionsButton from "../Buttons/EmotionsButtons";
import quoteData from "./quotesData.js";
import "./EmotionsPage.css";
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text';
import H2 from '../DisplayText/H2Text';

//Temp userId
const userId = 1;

function Emotions() {
  // need user_id from ContextProvider
  const { currentWeek, user, isAuthenticated, isLoading } = useAppContext();
  //need to figure out how to close the ability to click for the day/only enable one click per day
  const emotionsArray = [{emotion: "😢", number: 1},{emotion: "😒", number: 2},{emotion: "😬", number: 3},{emotion: "😀", number: 4},{emotion: "😍", number: 5} ]
  const [chosenEmotion, setChosenEmotion] = useState(null);
  
  function handleEmotion(emotionNum){
    console.log("running");
    setChosenEmotion(emotionNum)
    console.log(`your chosen emotion is ${chosenEmotion}`);
  }

  // We need to connect to the Database via a valid URL & Need to get the userID & name from the context provider

  useEffect(() => {
   if (chosenEmotion){

  async function postEmotion() {
    const res = await fetch(
  
      // neeed to actual API address
      `http://localhost:5000/moods`,
      {
        method: "POST",
        headers: { "content-type": "application/JSON"},
        body: JSON.stringify({
          user_id: userId, 
          mood: chosenEmotion
        })
      })
    const data = await res.json();
    console.log(data);
    //hopefully returned a unique post numb
  }
  postEmotion();
}}, [chosenEmotion]);
  
if (isLoading) {
  return <div>Loading ...</div>;
}

  return (
    isAuthenticated && (
    <div>
      <H1 text={`Hi ${user.given_name}`} />
      <H2 text={'How are you feeling today?'} />

      <div className="emotionsBar">

      {emotionsArray.map(
        (emotion) => 
          <EmotionsButton text={emotion.emotion} handleClick={handleEmotion} emotionNumber={emotion.number} />
      )}
      </div>
      <p>{quoteData[(Math.floor(Math.random()*quoteData.length))].quote}</p>

    </div>
  )
  )
}

export default Emotions;
