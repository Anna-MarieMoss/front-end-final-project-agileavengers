import React, { useState, useContext } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text';
import './journal.css';
import { useHistory } from 'react-router';
import PlaceholderQs from './PlaceholderQs';

import { ThemeContext } from '../../ThemeContext';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';

// MaterialUI Components
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AudiotrackRoundedIcon from '@material-ui/icons/AudiotrackRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import PhotoRoundedIcon from '@material-ui/icons/PhotoRounded';

//Alerts
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function JournalEntry({ emotion }) {
  //Dark / Light Theme
  const theme = useContext(ThemeContext);
  const history = useHistory();

  // Use Context
  const {
    isAuthenticated,
    isLoading,
    accessToken,
    userData,
    emotionsArray,
  } = useAppContext();

  const userId = userData?.id;

  if (!isAuthenticated) {
    history.push('/');
  }

  // Matching the Emoji to Mood Number
  const chosenEmotion = emotionsArray.filter((em) => {
    if (em.number === emotion) {
      return true;
    }
    return false;
  });

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
    toast(`Yay! You've successfully added to your journal!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
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
          mood: emotion,
        }),
        headers: {
          'content-type': 'application/JSON',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
    } catch (error) {
      console.error(error);
    }
    // once submted redirect to Journal View Page
    history.push('/journalview');
  }

  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

  if (isLoading) {
    return <div id={theme}>Loading ...</div>;
  }

  function handleClick(emotion) {
    console.log(emotion);
    async function postMoodEntry() {
      var assignedText;
      if (emotion[0].number === 5) {
        assignedText = 'You succeed!';
      }
      if (emotion[0].number === 4) {
        assignedText = 'You had a great day.';
      }
      if (emotion[0].number === 3) {
        assignedText = 'Today was frustrating.';
      }
      if (emotion[0].number === 2) {
        assignedText = 'Coding makes me sad!';
      }
      if (emotion[0].number === 1) {
        assignedText = 'Today was a difficult day!';
      }
      try {
        const res = await fetch(`${BACKEND_URL}/posts`, {
          method: 'POST',
          body: JSON.stringify({
            user_id: userId,
            text: assignedText,
            mood: emotion[0].number,
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
    }
    postMoodEntry();
    // once submted redirect to Journal View Page
    history.push('/journalview');
  }

  return (
    isAuthenticated && (
      <div id={theme}>
        <NavTop />
        <div className='container' id={theme}>
          <ToastContainer
            transition={Slide} // changes the transition to a slide rather than a bounce.  Alerts are rendering multiple times at the moment due to the page re redering all of the buttons.  Look into how you can stop this happening but keeep the cool styling tomorrow.
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <H1 text={`Hi ${userData?.name}! What have you been up to today?`} />
          {emotion && (
            <h1 style={{ fontSize: '5em' }}>{chosenEmotion[0].emotion}</h1>
          )}
          <br></br>
          <div id='journal-entry'>
            <TextField
              id='outlined-multiline-static'
              label='Journal Entry'
              fullWidth='true'
              multiline
              rows={4}
              defaultValue='Default Value'
              variant='outlined'
              color={muiTheme(theme)}
              onChange={(event) => {
                const { value } = event.target;
                setText(value);
              }}
              value={text}
              className='form-input'
              placeholder={
                PlaceholderQs[Math.floor(Math.random() * PlaceholderQs.length)]
              }
            />
            <div className='file-entry'>
              <input
                name='image'
                accept='image/*'
                //className={classes.input}
                style={{ display: 'none', overFlow: 'hidden' }}
                id='image'
                multiple
                type='file'
                onChange={handleImageInputChange}
                value={imgUpload}
              />
              <label htmlFor={'image'}>
                <PhotoRoundedIcon fontSize='large' />
              </label>
              <input
                id='video'
                type='file'
                name='video'
                accept='video/*'
                onChange={handleVideoInputChange}
                value={vidUpload}
                style={{ display: 'none', overFlow: 'hidden' }}
              />
              <label htmlFor={'video'}>
                <VideocamRoundedIcon fontSize='large' />
              </label>
              <input
                id='audio'
                type='file'
                //name='audio'
                accept='audio/*'
                onChange={handleAudioInputChange}
                value={audioUpload}
                style={{ display: 'none', overFlow: 'hidden' }}
              />
              <label htmlFor={'audio'}>
                <AudiotrackRoundedIcon fontSize='large' />
              </label>
            </div>
          </div>
          <Button
            className='btn'
            onClick={handleSubmitFile}
            variant='outlined'
            color={muiTheme(theme)}
          >
            Submit
          </Button>
          <br></br>
          {previewImgSource && (
            <img
              src={previewImgSource}
              alt='chosenImg'
              style={{
                width: '70%',
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
              style={{
                width: '70%',
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
              style={{
                width: '70%',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              autoplay
              controls
            />
          )}
          {emotion && (
            <Button
              onClick={() => handleClick(chosenEmotion)}
              variant='outlined'
              className='btn'
              color={muiTheme(theme)}
            >
              Skip
            </Button>
          )}
        </div>
        {!emotion && <NavBar />}
      </div>
    )
  );
}
