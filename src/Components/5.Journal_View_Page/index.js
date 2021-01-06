import React, { useState } from 'react';
import { useAppContext } from '../../AppContext';
import JournalAccordion from '../Acordian';
import H1 from '../DisplayText/H1Text/index';
import JournalContainer from '../JournalContainer/index';
import dummyJournal from './DummyJournal.js';
import testVid from './test.mp4';

function JournalView() {
  const { user, isAuthenticated, isLoading, accessToken } = useAppContext();

  //need to get this data from the fetch request from backend - holding useStates atm
  const [imgSource, setPreviewImgSource] = useState(null);
  const [vidSource, setPreviewVidSource] = useState(null);
  const [audioSource, setPreviewAudioSource] = useState(null);

  // do we need a custom hook to get out journal and emotion data and store as a state
  // Need to set ket as the unique post key to add favourite, delete functions and be able to view

  function handleDelete(postId) {
    // delete request to the database
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
        <p>(Add in filters for date range, emotions etc)</p>
        <div>
          {dummyJournal.map((journalEntry, index) => (
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
        <div className='journal-containers'>
          {dummyJournal.map((journalEntry, index) => (
            <JournalContainer
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
