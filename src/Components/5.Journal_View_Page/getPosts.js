import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useAppContext } from '../../AppContext';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const user_id = 1;

// get all post
function JournalRecord() {
  const [journalDisplay, setJournalDisplay] = useState([]);
  const { emotionsArray } = useAppContext();

  useEffect(() => {
    if (user_id) {
      async function getJournalById() {
        const res = await fetch(`${BACKEND_URL}/moodsandposts/${user_id}`);
        const data = await res.json();
        const { payload } = data;
        setJournalDisplay(payload);
        console.log(data); // all of the records in the moodsandpost table from db
        console.log(data.payload[0]); // to check one record from the table.  Need to use a map method in the return to display all records
      }
      getJournalById();
    }
  }, [setJournalDisplay]);

  return (
    <div>
      <h2> Crude journal display to check functionality</h2>
      <button onclick={JournalRecord}>View Journal Record</button>
      <p>
        {journalDisplay.map((journalDisplay) => {
          return (
            <div>
              <h4>Text: {journalDisplay.text}</h4>
              <h4>Mood: {journalDisplay.mood}</h4>
              {journalDisplay.image && (
                <img
                  src={journalDisplay.image}
                  alt='chosenImg'
                  style={{ width: '70%' }}
                />
              )}
              {journalDisplay.video && (
                <video
                  src={journalDisplay.video}
                  alt='chosenVideo'
                  style={{ width: '70%' }}
                  controls
                />
              )}
              {journalDisplay.audio && (
                <ReactAudioPlayer
                  src={journalDisplay.audio}
                  alt='chosenAudio'
                  style={{ width: '70%' }}
                  autoplay
                  controls
                />
              )}
            </div>
          );
        })}
      </p>
    </div>
  );
}

export default JournalRecord;

// EXAMPLE OF THE PAYLOAD DATA - console.log(data)

// {success: true, payload: Array(11)}
// payload: Array(11)
// 0: {id: 1, user_id: 1, text: "I love the course", image: "Some Image Link", video: "Some Video Link", …}
// 1: {id: 2, user_id: 1, text: "I hate the course", image: "none", video: "none", …}
// 2: {id: 3, user_id: 1, text: "I love the course", image: "pic", video: "vid", …}
// 3: {id: 5, user_id: 1, text: "I love the course", image: "pic", video: "vid", …}
// 4: {id: 7, user_id: 1, text: "I love the course", image: "pic", video: "vid", …}
// 5: {id: 9, user_id: 1, text: "I love the course", image: "pic", video: "vid", …}
// 6: {id: 11, user_id: 1, text: "I love the course", image: "pic", video: "vid", …}
// 7: {id: 13, user_id: 1, text: "I love the course", image: "pic", video: "vid", …}
// 8: {id: 16, user_id: 1, text: "Laura as Bugs life", image: "http://res.cloudinary.com/soc-journal/image/upload/v1609775748/c5oymgbsvxq7zz2onmkg.jpg", video: "", …}
// 9: {id: 18, user_id: 1, text: "Laura as Bugs life", image: "http://res.cloudinary.com/soc-journal/image/upload/v1609775951/surdv9xwyernqrjdtmaq.jpg", video: "", …}
// 10: {id: 19, user_id: 1, text: "Laura as Bugs life", image: "http://res.cloudinary.com/soc-journal/image/upload/v1609776264/ffbj6jqeisj9lxoio6sr.jpg", video: "http://res.cloudinary.com/soc-journal/video/upload/v1609776292/kolmdgq8cavibn1apxwp.mp4", …}

// EXAMPLE SINGLE RECORD - console.log(data.payload[0])

// payload: Array(11)
// 0:
// audio: "none"
// date: "2021-01-04T00:00:00.000Z"
// favorite: true
// id: 1
// image: "Some Image Link"
// text: "I love the course"
// user_id: 1
// video: "Some Video Link"

// TO DO LIST -
// patch favourite boolean from false to true

// MLP - filter by date

// MLP - filter by favourites

/* function displayFavourites(){
    if(data.payload[0].favourite === true){
      return blah blah blah...
} */

// MLP - patch to edit text
