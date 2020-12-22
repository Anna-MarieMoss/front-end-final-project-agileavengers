import React, {useEffect, useState} from 'react';
import EmotionsButton from "../Buttons/EmotionsButtons";

function Emotions() {
  // need user_id from ContextProvider

  //temp useState for user_id
  const [userId, setUserId] = useState(1);
  //need to figure out how to close the ability to click for the day/only enable one click per day
  const emotionsArray = [{emotion: "😢", number: 1},{emotion: "😒", number: 2},{emotion: "😬", number: 3},{emotion: "😀", number: 4},{emotion: "😍", number: 5} ]
  // array of emtotions objects - useState // object {emotion: emojis, number: 1}
  const [chosenEmotion, setChosenEmotion] = useState(0);
  // chosen emotion useState

  function handleEmotion(emotionNum){
    console.log("running");
    setChosenEmotion(emotionNum)
    console.log(`your chosen emotion is ${chosenEmotion}`);
    //console.log(chosenEmotion);
  }
  //fetch post request - need usernum from login
  //useEffect

//   useEffect(() => {
//     if (!chosenEmotion) {
//       return;
//     }
//   async function postEmotion() {
//     const res = await fetch(
//       // neeed to actual API address
//       `https://localhost:3000/moods`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id: userId, //context provider object.user_id
//           mood: chosenEmotion,
//         })
//       })
//     const data = await res.json();
//     console.log(data);
//     //hopefully returned a unique post numb
//   }
//   postEmotion();
// }, [chosenEmotion]);

    //when chosenEmotion changes send fetch request
// handleClick - post request to the database with emotion number - based on the emotion taht is clicked
    // change our ChosenEmotion State
// for each - array.map (() => <EmotionsButton text={emoji.index} key=emoji.number onclick={handleEmotion})
  return (
    <div>
      <h1>Hello *NAME*</h1>
      <h1>How are you feeling today?</h1>
      <div className = "emotionBar">
      {emotionsArray.map(
        (emotion) => 
          <EmotionsButton text={emotion.emotion} handleClick={handleEmotion} emotionNumber={emotion.number} />
      )}
      </div>
      <p>(Fetch request of motivational quotes here!)</p>

    </div>
  );
}

export default Emotions;
