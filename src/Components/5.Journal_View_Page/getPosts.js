import React, { useState, useEffect } from 'react';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const user_id = 1;

// get all post
function JournalRecord() {
  const [journalDisplay, setJournalDisplay] = useState([]);

  useEffect(() => {
    if (user_id) {
      async function getJournalById() {
        const res = await fetch(`${BACKEND_URL}/posts${user_id}`);
        const data = await res.json();
        const { payload } = data;
        setJournalDisplay(payload);
        console.log(journalDisplay);
      }
      getJournalById();
    }
  }, []);

  return (
    <div>
      <h2> Crude journal display to check functionality</h2>
      <p>{journalDisplay}</p>
    </div>
  );
}

export default JournalRecord;

// patch favourite boolean from false to true

// MLP - filter by date

// MLP - filter by favourites

// MLP - patch to edit text
