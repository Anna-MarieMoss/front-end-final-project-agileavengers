import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text';
import './journal.css';

//this will need to link to user iD
const userId = 1;

function JournalEntry() {
  const { currentWeek, user, isAuthenticated, isLoading } = useAppContext();
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [vid, setVid] = useState('');
  const [audio, setAudio] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('A new post has been added to your journal.');
  };

  //Draft post request

  useEffect(() => {
    if (text) {
      async function postJournalEntry() {
        const res = await fetch(
          // neeed to actual API address
          `http://localhost:5000/posts`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/JSON' },
            body: JSON.stringify({
              user_id: userId,
              post: text,
              // ask back end to add columns to tables
              //  image: img,
              //  audio: audio,
              //  video: vid
            }),
          }
        );
        const data = await res.json();
        console.log(data);
      }
      postJournalEntry();
    }
  }, [text]);
  // , img, audio, vid]);

  //
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
    <div className='wrapper'>
    <H1 text={`${user.given_name} how was your day today?`}/>
      <h1>What did you learn?</h1>
      <div className='container'>
        {/* <br></br> */}
        <div className='preview'>
          <h2>Create post:</h2>
          <h2>{text}</h2>
          <h4>{img}</h4> <h4>{vid}</h4> <h4>{audio}</h4>
        </div>
        <form action='/journalMedia' onSubmit={handleSubmit}>
          <fieldset>
            <textarea
              className='journalNote'
              rows='4'
              cols='30'
              //add onchange event here
              placeholder='Add your journal note here...'
              type='text'
              onChange={(event) => setText(event.target.value)}
            ></textarea>
            {/* </form> */}

            <p> (Add photos, images and voice recordings here!)</p>

            {/* <form> */}
            <label for='img'>Select image:</label>
            <input
              type='file'
              id='img'
              name='img'
              accept='image/*'
              onChange={(event) => setImg(event.target.files[0])}
            />
            <input className='align-right' type='submit' value='+' />
            {/* </form> */}
            <br></br>
            {/* <form> */}
            <label for='video'>Select video:</label>
            <input
              type='file'
              id='video'
              name='video'
              accept='video/*'
              onChange={(event) => setVid(event.target.value)}
            />
            <input type='submit' value='+' />
            {/* </form> */}
            <br></br>
            {/* <form> */}
            <label for='audio'>Select audio:</label>
            <input
              type='file'
              id='audio'
              name='audio'
              accept='audio/*'
              onChange={(event) => setAudio(event.target.value)}
            />
            <input className='align-right' type='submit' value='+' />
          </fieldset>
          <br></br>
          <button className='journalButton' type='submit'>
            Save
          </button>
        </form>
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
  )
  )
}

export default JournalEntry;
