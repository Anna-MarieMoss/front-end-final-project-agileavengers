import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './journal.css';

//this will need to link to user iD
const userId = 1;

export default function Upload() {
  const [fileInputState, setFileInputState] = useState('');
  // Our original code to hold states for each input...
  const [text, setText] = useState('');
  const [imgUpload, setImgUpload] = useState('');
  const [vidUpload, setVidUpload] = useState('');
  const [audioUpload, setAudioUpload] = useState('');

  const [previewSource, setPreviewSource] = useState();
  // states to hold the URL strings of the file data...
  const [previewImgSource, setPreviewImgSource] = useState();
  const [previewVidSource, setPreviewVidSource] = useState();
  const [previewAudioSource, setPreviewAudioSource] = useState();

  //   const [selectedState, setSelectedState] = useState('');

  const handleFileInputChange = (e) => {
    // Storing input value into a variable...
    const file = e.target.files[0];
    // Preview function to show the text(?) / img /vid /audio that has been selected for upload.
    previewFile(file);
  };

  const handleImageInputChange = (e) => {
    const imgFile = e.target.files[0];
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

  const previewFile = (file) => {
    //show the user what they have selected by creating a reader...
    const reader = new FileReader(); // this is a built in javascript api
    reader.readAsDataURL(file); // converts img into a URL / string
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const previewImage = (imgFile) => {
    //show the user what they have selected by creating a reader...
    const reader = new FileReader(); // this is a built in javascript api
    reader.readAsDataURL(imgFile); // converts img into a URL / string
    reader.onloadend = () => {
      setPreviewImgSource(reader.result);
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

  // function to submit the uploaded file's stringified data to the server...
  const handleSubmitFile = (e) => {
    console.log('submitting');
    e.preventDefault();
    // if (!previewSource) return; // if a user hasn't selected a file just return.
    uploadImage(previewSource);
    // uploadImg(previewImgSource);
    // uploadVideo(previewVidSource);
    // uploadAudio(previewAudioSource);
    postJournalEntry(
      userId,
      text,
      previewImgSource,
      previewVidSource,
      previewAudioSource
    );

    ////////
    //if (previewSource) {
    // uploadImage(previewSource);
    // } else if (previewImgSource) {
    //   uploadImg(previewImgSource);
    // } else if (previewVidSource) {
    //   uploadVideo(previewVidSource);
    // } else if (previewAudioSource) {
    //   uploadAudio(previewAudioSource);
    //} else return;
  };
  //////
  // };

  const uploadImage = (base64EncodedImage) => {
    console.log(base64EncodedImage);
  };

  //const uploadImg = (base64EncodedImage) => {
  // console.log(base64EncodedImage);
  //};

  // const uploadVideo = (base64EncodedImage) => {
  //   console.log(base64EncodedImage);
  // };

  // const uploadAudio = (base64EncodedImage) => {
  //   console.log(base64EncodedImage);
  // };

  ///////////////////////////////////////
  // Posting journal entry and media to the db - need to sort out corrs console.error();
  //   useEffect(() => {
  //     if (text) {
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
        <input
          type='file'
          name='image'
          onChange={handleFileInputChange}
          value={fileInputState}
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
      {previewSource && (
        <img src={previewSource} alt='chosen' style={{ width: '70%' }} />
      )}
      <br></br>
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
