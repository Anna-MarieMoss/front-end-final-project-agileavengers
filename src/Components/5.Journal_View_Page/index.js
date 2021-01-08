import { PostAddOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

import { useAppContext } from '../../AppContext';
import JournalAccordion from '../Acordian';
import H1 from '../DisplayText/H1Text/index';
import JournalContainer from '../JournalContainer/index';
import dummyJournal from './DummyJournal';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const user_id = 1;

// get all post
function JournalView() {
  const { user, isAuthenticated, isLoading, accessToken } = useAppContext();
  const [journalDisplay, setJournalDisplay] = useState([]);
  const [sortConstraint, setSortConstraint] = useState('Newest to oldest');
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (user_id) {
      async function getJournalById() {
        const res = await fetch(`${BACKEND_URL}/moodsandposts/${user_id}`);
        const data = await res.json();
        const { payload } = data;
        for (let post of payload) {
          post.date = post.date.slice(0, 10);
        }

        setJournalDisplay(payload);

        console.log(data); // all of the records in the moodsandpost table from db
        console.log(data.payload[0]); // to check one record from the table.  Need to use a map method in the return to display all records
      }
      getJournalById();
    }
  }, []);

  function filterByFavorite() {
    setShowFavorites(!showFavorites);
  }

  function changeSortBy(event) {
    setSortConstraint(event.target.value);
  }

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
        <H1 text={`${user.given_name}'s journey so far....`} />
        <button onClick={filterByFavorite}>
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>
        <select onChange={changeSortBy}>
          <option>Sort By</option>
          <option value='Newest to oldest'>Newest to oldest</option>
          <option value='Oldest to newest'>Oldest to newest</option>
          <option value='Mood high to low'>Mood high to low</option>
          <option value='Mood low to high'>Mood low to high</option>
        </select>
        <div>
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
