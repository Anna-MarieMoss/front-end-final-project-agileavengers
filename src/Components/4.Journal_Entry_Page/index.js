import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text';
import H2 from '../DisplayText/H2Text';
import './journal.css';
import { useHistory } from 'react-router';

// MaterialUI Components
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

//Alerts
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function JournalEntry() {
  // Use Context
  const {
    isAuthenticated,
    isLoading,
    accessToken,
    userData,
  } = useAppContext();

  const userId = userData?.id;

  // History from React Router
  const history = useHistory();

  // Code to hold the states of each input...
  const [text, setText] = useState('');
  const [imgUpload] = useState('');
  const [vidUpload] = useState('');
  const [audioUpload] = useState('');

  // These states hold the super long DataURL strings of the file...
  const [previewImgSource, setPreviewImgSource] = useState();
  const [previewVidSource, setPreviewVidSource] = useState();
  const [previewAudioSource, setPreviewAudioSource] = useState();

  const handleImageInputChange = (e) => {
    // Storing input value into a variable...
    const imgFile = e.target.files[0];
    // Preview function to show the img /vid /audio file that has been selected for upload.
    previewImage(imgFile);
  };
  const handleVideoInputChange = (e) => {
    const videoFile = e.target.files[0];
    previewVideo(videoFile);
  };
  const handleAudioInputChange = (e) => {
    const audioFile = e.target.files[0];
    previewAudio(audioFile);
  };
  const previewImage = (imgFile) => {
    //This section show the user what file they have selected by creating a reader...
    const reader = new FileReader(); // (nb. this is a built in javascript api)
    reader.readAsDataURL(imgFile); // then converts img into a DataURL / string
    reader.onloadend = () => {
      setPreviewImgSource(reader.result);
      // The previewImgSource state will now be able to display the uploaded file when used at the bottom of the return code.
    };
  };
  const previewVideo = (videoFile) => {
    //show the user what they have selected by creating a reader...
    const reader = new FileReader(); // this is a built in javascript api
    reader.readAsDataURL(videoFile); // converts img into a URL / string
    reader.onloadend = () => {
      setPreviewVidSource(reader.result);
    };
  };
  const previewAudio = (audioFile) => {
    //show the user what they have selected by creating a reader...
    const reader = new FileReader(); // this is a built in javascript api
    reader.readAsDataURL(audioFile); // converts img into a URL / string
    reader.onloadend = () => {
      setPreviewAudioSource(reader.result);
    };
  };
  // function to submit the text and uploaded file's to the server...
  const handleSubmitFile = (e) => {
    console.log('submitting');
    e.preventDefault();
    postJournalEntry(
      userId,
      text,
      previewImgSource,
      previewVidSource,
      previewAudioSource
    );
  };

  async function postJournalEntry(
    userId,
    text,
    previewImgSource,
    previewVidSource,
    previewAudioSource
  ) {
    try {
      const res = await fetch(`${BACKEND_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: userId,
          text: text,
          image: previewImgSource,
          video: previewVidSource,
          audio: previewAudioSource,
        }),
        headers: {
          'content-type': 'application/JSON',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    toaster.notify(
      `Yay! You've successfully added to your journal!`,
      {
        duration: 2000,
      }
    )
    // once submted redirect to Journal View Page
    history.push('/journalview');
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className='wrapper'>
      <div className='container'>
        <H1 text={`${userData?.name} how was your day today?`} />
        <H2 text={`What did you learn today?`} />
       <br></br>
        <div id='Emma-New-Form'>
          <TextField
                id="outlined-multiline-static"
                label="Journal Entry"
                fullWidth='true'
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                color="primary"
                onChange={(event) => {
                      const { value } = event.target;
                      setText(value);}}
                value={text}
                className='form-input'
                placeholder='How are you doing today?'
          />
          <div className='file-entry'>
            <input
              name='image'
              accept="image/*"
              //className={classes.input}
              style={{ display: 'none' }}
              id="image"
              multiple
              type="file"
              onChange={handleImageInputChange}
              value={imgUpload}
            />
            <label htmlFor={'image'} >
              <Button variant="raised" component="span" >
                Image Upload
              </Button>
            </label> 
          </div>

          <div className='file-entry'>
            <input
              id='video'
              type='file'
              name='video'
              accept='video/*'
              onChange={handleVideoInputChange}
              value={vidUpload}
              style={{ display: 'none', }}
            />
            <label htmlFor={'video'} >
              <Button variant="raised" component="span" >
                Video Upload
              </Button>
            </label>
          </div>

          <div className='file-entry'>
            <input
              id='audio'
              type='file'
              //name='audio'
              accept='audio/*'
              onChange={handleAudioInputChange}
              value={audioUpload}
              style={{ display: 'none', }}
            />
            <label htmlFor={'audio'} >
              <Button variant="raised" component="span" >
                Audio Upload
              </Button>
            </label>
          </div>
          <Button
            className='btn'
            onClick={handleSubmitFile}
            variant='outlined'
            color='secondary'
          >
            Submit
          </Button>
          </div>
          <br></br>
          {previewImgSource && (
            <img
              src={previewImgSource}
              alt='chosenImg'
              style={{ width: '70%', 
                      display: 'block', 
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
            />
          )}
          <br></br>
          {previewVidSource && (
            <video
              src={previewVidSource}
              alt='chosenVideo'
              style={{ width: '70%', 
                      display: 'block', 
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
              controls
            />
          )}
          {previewAudioSource && (
            <ReactAudioPlayer
              src={previewAudioSource}
              alt='chosenAudio'
              style={{ width: '70%', 
                      display: 'block', 
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
              autoplay
              controls
            />
          )}
          <Button
          handleClick={() => {
            history.push('/journalview');
          }}
          text='Skip'
          variant='outlined'
          color='secondary'
          className='btn'
        >
          Skip
        </Button>
        </div>
      </div>
    )
  );
}
