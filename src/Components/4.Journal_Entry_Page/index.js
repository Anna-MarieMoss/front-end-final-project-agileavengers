import React from 'react';

function JournalEntry() {
  return (
    <div>
      <h1>How was your day today?</h1>
      <h1>What did you learn?</h1>
      <div className='container'>
        <form>
          <textarea
            className='journalNote'
            rows='4'
            cols='60'
            //add onchange event here
            placeholder='Add your journal note here...'
            type='text'
          ></textarea>
          <br></br>
          <button type='submit'>Submit</button>
          <input type='file' accept='image/x-png,image/jpeg,image/gif' />
        </form>
      </div>

      <p> (Add journal component card here)</p>
    </div>
  );
}

export default JournalEntry;
