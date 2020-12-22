import React, {useEffect, useState} from 'react';
import EmotionsButton from "../Buttons/EmotionsButtons";
import quoteData from "./quotesData.js";

//Temp userId
const userId = 1;

function Emotions() {
  // need user_id from ContextProvider

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
      `http://localhost:3000/moods`,
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
  

  return (
    <div>
      <h1>Hello Alice</h1>
      <h1>How are you feeling today?</h1>
      <div >
      {emotionsArray.map(
        (emotion) => 
          <EmotionsButton text={emotion.emotion} handleClick={handleEmotion} emotionNumber={emotion.number} />
      )}
      </div>
      <p>{quoteData[(Math.floor(Math.random()*quoteData.length))].quote}</p>

    </div>
  );
}

export default Emotions;
