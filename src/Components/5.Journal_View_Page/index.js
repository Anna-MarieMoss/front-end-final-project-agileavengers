import { PostAddOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../AppContext';
import JournalAccordion from '../Acordian';
import H1 from '../DisplayText/H1Text/index';
import JournalContainer from '../JournalContainer/index';
// import dummyJournal from './DummyJournal.js';
// import JournalRecord from './getPosts';
// import testVid from './test.mp4';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const user_id = 1;

// get all post
function JournalView() {
  const { user, isAuthenticated, isLoading } = useAppContext();
  const [journalDisplay, setJournalDisplay] = useState([]);

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

  // do we need a custom hook to get out journal and emotion data and store as a state
  // Need to set ket as the unique post key to add favourite, delete functions and be able to view

  function handleDelete(postId) {
    // delete request to the database
    // useEffect(() => {
    console.log('handling delete');
    async function deleteJournalIdFromDB() {
      const requestOptions = {
        method: 'DELETE',
      };
      console.log(requestOptions);
      fetch(`${BACKEND_URL}/posts/${postId}`, requestOptions);
    }
    deleteJournalIdFromDB();
    // }, [postId]);
  }

  function handleFavorite(postId) {
    // patch request to the database
  }

  // need to make post appear when it is clicked
  function handleJournalClick() {
    console.log('need to make full post appear');
    // onClick - could make a card display -can have different media types - could use lots of useState()..... boolean
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div>
        <div>
          <h2>TEST OF GET JOURNAL REQUEST</h2>
          <p>{/* <JournalRecord /> */}</p>
        </div>

        <H1 text={`${user.given_name}'s journey so far....`} />
        <p>(Add in filters for date range, emotions etc)</p>
        <div>
          {journalDisplay.map((journalEntry, index) => (
            <JournalAccordion
              text={journalEntry.text}
              handleClick={handleJournalClick}
              emotionNumber={journalEntry.mood}
              journalDate={journalEntry.date}
              index={index}
              favorite={journalEntry.favorite}
              handleFavorite={handleFavorite}
              handleDelete={handleDelete}
              audioSource={journalEntry.audio}
              imgSource={journalEntry.image}
              vidSource={journalEntry.video}
            />
          ))}
        </div>
      </div>
    )
  );
}

export default JournalView;
