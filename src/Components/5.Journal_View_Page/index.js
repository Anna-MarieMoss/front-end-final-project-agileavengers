import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../AppContext';
import JournalAccordion from '../Acordian';
import H1 from '../DisplayText/H1Text/index';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// get all post
function JournalView() {
  const { isAuthenticated, isLoading, accessToken, userData } = useAppContext();
  const [journalDisplay, setJournalDisplay] = useState([]);
  const [journalDelete, setJournalDelete] = useState(false);
  const [journalDeleteId, setJournalDeleteId] = useState(null);
  let userId = userData?.id;

  console.log('user data id', userData.id);

  useEffect(() => {
    if (userData) {
      async function getJournalById() {
        const res = await fetch(`${BACKEND_URL}/moodsandposts/${userId}`);
        // if Access Token Middleware is added to moods and posts BE -need to add header with AT
        const data = await res.json();
        const { payload } = data;
        setJournalDisplay(payload);
      }
      getJournalById();
    }
  }, []);

  console.log('this is journalDispaly', journalDisplay);

  // do we need a custom hook to get out journal and emotion data and store as a state
  // Need to set ket as the unique post key to add favourite, delete functions and be able to view

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
        document.location.reload();
      });
    return () => abortController.abort();
  }, [journalDelete]);

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
        <H1 text={`${userData?.name}'s journey so far....`} />
        <p>(Add in filters for date range, emotions etc)</p>
        <div>
          {journalDisplay.map((journalEntry) => (
            <JournalAccordion
              text={journalEntry.text}
              handleClick={handleJournalClick}
              emotionNumber={journalEntry.mood}
              journalDate={journalEntry.date}
              journalEntryId={journalEntry.id}
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
