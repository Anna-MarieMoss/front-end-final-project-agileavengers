import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../AppContext';
import JournalAccordion from '../Acordian';
import H1 from '../DisplayText/H1Text/index';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// get all post
function JournalView() {
  const {
    isAuthenticated,
    isLoading,
    accessToken,
    userData,
    user,
  } = useAppContext();
  const [journalDisplay, setJournalDisplay] = useState([]);
  const [journalDelete, setJournalDelete] = useState(false);
  const [journalDeleteId, setJournalDeleteId] = useState(null);
  const [sortConstraint, setSortConstraint] = useState('Newest to oldest');
  const [showFavorites, setShowFavorites] = useState(false);
  const [reloadJournal, setreloadJournal] = useState(false);
  let userId = userData?.id;

  useEffect(() => {
    if (userId) {
      async function getJournalById() {
        const res = await fetch(`${BACKEND_URL}/moodsandposts/${userId}`);
        // if Access Token Middleware is added to moods and posts BE -need to add header with AT
        const data = await res.json();
        const { payload } = data;
        for (let post of payload) {
          post.date = post.date.slice(0, 10);
        }

        setJournalDisplay(payload);
        setreloadJournal(false);
      }
      getJournalById();
    }
  }, [reloadJournal, userId]);

  function filterByFavorite() {
    setShowFavorites(!showFavorites);
  }

  function changeSortBy(event) {
    setSortConstraint(event.target.value);
  }

  //Delete journal entry
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

  //Patch favourite journal entry
  function handleFavorite(postId, favorite) {
    console.log(favorite);
    async function patchFave() {
      const res = await fetch(`${BACKEND_URL}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/JSON',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          favorite: favorite,
        }),
      });
      const data = await res.json();
      console.log(data);
    }
    patchFave();
    setreloadJournal(true);
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <H1 text={`${user?.given_name}'s journey so far....`} />
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
