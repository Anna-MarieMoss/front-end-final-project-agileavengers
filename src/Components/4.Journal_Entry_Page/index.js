import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text';
import H2 from '../DisplayText/H2Text';
import './journal.css';
import { useHistory } from 'react-router';

import ToastAlert from '../ToastAlerts/toastAlerts';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import Button from '../Buttons/Button/index';
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
  const [imgUpload, setImgUpload] = useState('');
  const [vidUpload, setVidUpload] = useState('');
  const [audioUpload, setAudioUpload] = useState('');

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

    // once submted redirect to Journal View Page
    history.push('/journalview');

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
    // once submted redirect to Journal View Page
    history.push('/journalview');
  }
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className='wrapper'>
        <H1 text={`${userData?.name} how was your day today?`} />
        <H2 text={`What did you learn today?`} />
        <ToastAlert />
        <div className='container'>
          <form onSubmit={handleSubmitFile}>
            <h2>Create post:</h2>
            <h2>{text}</h2>
            <input
              type='text'
              name='text'
              onChange={(event) => setText(event.target.value)}
              value={text}
              className='form-input'
            />
            <br></br>
            <label for='img'>Select image:</label>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={handleImageInputChange}
              value={imgUpload}
              className='form-input'
            />
            <br></br>
            <label for='video'>Select video:</label>
            <input
              type='file'
              name='video'
              accept='video/*'
              onChange={handleVideoInputChange}
              value={vidUpload}
              className='form-input'
            />
            <br></br>
            <label for='audio'>Select audio:</label>
            <input
              type='file'
              name='audio'
              accept='audio/*'
              onChange={handleAudioInputChange}
              value={audioUpload}
              className='form-input'
            />
            <button
              className='btn'
              type='submit'
              onClick={() => {
                toaster.notify(
                  `Yay! You've successfully added to your journal!`,
                  {
                    duration: 2000,
                  }
                );
              }}
            >
              Submit
            </button>
          </form>
          <br></br>
          {/* Media Upload previews for image, video and audio player */}
          {previewImgSource && (
            <img
              src={previewImgSource}
              alt='chosenImg'
              style={{ width: '70%' }}
            />
          )}
          <br></br>
          {previewVidSource && (
            <video
              src={previewVidSource}
              alt='chosenVideo'
              style={{ width: '70%' }}
              controls
            />
          )}
          {previewAudioSource && (
            <ReactAudioPlayer
              src={previewAudioSource}
              alt='chosenAudio'
              style={{ width: '70%' }}
              autoplay
              controls
            />
          )}
        </div>
        <Button
          handleClick={() => {
            history.push('/journalview');
          }}
          text='Skip'
        />
      </div>
    )
  );
}
