import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './journal.css';

//this will need to link to user iD
const userId = 1;

export default function Upload() {
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
  };

  async function postJournalEntry(
    userId,
    text,
    previewImgSource,
    previewVidSource,
    previewAudioSource
  ) {
    try {
      const res = await fetch(`http://localhost:5000/posts`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: userId,
          text: text,
          image: previewImgSource,
          video: previewVidSource,
          audio: previewAudioSource,
        }),
        headers: { 'content-type': 'application/JSON' },
      });

      console.log(res);

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Test Upload</h1>
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
        <button className='btn' type='submit'>
          Submit
        </button>
      </form>
      <br></br>
      {/* Media Upload previews for image, video and audio player */}
      {previewImgSource && (
        <img src={previewImgSource} alt='chosenImg' style={{ width: '70%' }} />
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
  );
}
