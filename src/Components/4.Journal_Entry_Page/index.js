import React from 'react';
import './journal.css';

function JournalEntry() {
  return (
    <div>
      <h1>How was your day today?</h1>
      <h1>What did you learn?</h1>
      <div className='container'>
        <br></br>
        <form>
          <textarea
            className='journalNote'
            rows='4'
            cols='60'
            //add onchange event here
            placeholder='Add your journal note here...'
            type='text'
          ></textarea>
          {/* <br></br> */}
          {/* <input type='file' accept='image/x-png,image/jpeg,image/gif' /> */}
        </form>

        <p> (Add photos, images and voice recordings here!)</p>

        <form>
          <label for='img'>Select image:</label>
          <input type='file' id='img' name='img' accept='image/*' />
          <input className='align-right' type='submit' value='Add' />
        </form>
        <br></br>
        <form>
          <label for='video'>Select video:</label>
          <input type='file' id='video' name='video' accept='video/*' />
          <input className='align-right' type='submit' value='Add' />
        </form>
        <br></br>
        <form>
          <label for='audio'>Select audio:</label>
          <input type='file' id='audio' name='audio' accept='audio/*' />
          <input className='align-right' type='submit' value='Add' />
        </form>
        <br></br>
        <button type='submit'>Submit</button>
        <br></br>
      </div>

      {/* <div>
        <br></br>
        <form action='#' id='myform' enctype='multipart/form-data'>
          <input
            type='file'
            id='capture'
            accept='image/*,video/*,audio/*'
            capture
            multiple
          />

          <br />
          
        <input type='submit' value='Add media' />
        </form>
        <p>
          <img src='' id='img' alt='from phone' />
        </p>
        <p>
          <audio src='' id='audio' controls></audio>
        </p>
        <p>
          <video src='' id='video' controls></video>
        </p>
      </div> */}
    </div>
  );
}

export default JournalEntry;
