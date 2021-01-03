import React from 'react';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text/index';
import JournalContainer from '../JournalContainer/index'
import dummyJournal from './DummyJournal.js'

function JournalView() {
  const { user, isAuthenticated, isLoading } = useAppContext();
  
  // do we need a custom hook to get out journal and emotion data and store as a state

  //temp Emotion Array Num - need to get this from the return from the DB Query
  let emotionNum = 3;

  // need to make post appear when it is clicked
  function handleJournalClick(){
    console.log('need to make full post appear')
  }
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
    <div>
      <H1 text={`${user.given_name}'s journey so far....`} />
      <p>(Add in filters for date range, emotions etc)</p>
      <div className='journal-containers'>
      {dummyJournal.map(
        (journalEntry, index) => 
          <JournalContainer text={journalEntry.text} handleClick={handleJournalClick} emotionNumber={journalEntry.mood} journalDate={journalEntry.date} key={index} test={'E'}/>
      )}
      </div>
    </div>
  ) 
  )
}

export default JournalView;
