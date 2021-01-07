import React, { useContext } from 'react';
// import toaster from 'toasted-notes';
import '../../.././App.css';
import 'toasted-notes/src/styles.css';
import ThemeContext from '../../.././App.js';
//// 2ND TYPE OF ALERTS WITH COLOURS!
import {
  ToastContainer,
  toast,
  Slide,
  Zoom,
  Flip,
  Bounce,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Backend URL
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function TrophyButton({ image, id, color }) {
  const value = useContext(ThemeContext);
  // trying new toast alerts
  // const notify = () => {
  //   toast('Wow so easy !');
  //   toast.success('Success notification!', {
  //     position: toast.POSITION.TOP_LEFT,
  //   });
  //   toast.info('Info notification!', { position: toast.POSITION.TOP_CENTER });
  //   toast.warn('Warning notification!', {
  //     position: toast.POSITION.BOTTOM_LEFT,
  //   });
  //   toast.error('Error notification!', {
  //     position: toast.POSITION.BOTTOM_CENTER,
  //   });
  //   toast.dark('Dark notification!', {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //   });
  // };
  /////

  // let user_Id = 1;  //we need to get this from the app context

  // onclick function that sets background colour to fill and also sends patch/post request to the database to turn boolean to true

  function handleTrophy(changingColor) {
    document.getElementById(id).setAttribute('fill', changingColor);
    //TO DO: send patch? request to database to change boolean to T/F. How do we populate the database with the trophies- post request on sign up that creates trophies as boolean 'false'?

    // async function patchTrophy() {
    //   const res = await fetch(`${BACKEND_URL}/trophies`, {
    //     method: 'PATCH',
    //     headers: { 'content-type': 'application/JSON' },
    //     body: JSON.stringify({
    //       userId: user_Id, // this needs to be bought in from app context
    //       trophyName: id, //need to change this to match the database
    //       awarded: true,
    //     }),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    // }
    // patchTrophy();
  }

  return (
    <div>
      <ToastContainer
        // transition={Slide} // changes the transition to a slide rather than a bounce.  Alerts are rendering multiple times at the moment due to the page re redering all of the buttons.  Look into how you can stop this happening but keeep the cool styling tomorrow.
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <button
        id={value}
        style={{ border: '0px' }}
        // onClick={() => {
        //   handleTrophy(color);
        // }}
        onClick={() => {
          handleTrophy(color);
          // toaster.notify(`Congratulations, you've mastered a new skill!`, {
          //   duration: 2000,
          // });
          toast('Wow so easy !');
          toast.success('Success notification!', {
            position: toast.POSITION.TOP_LEFT,
          });
          toast.info('Info notification!', {
            position: toast.POSITION.TOP_CENTER,
          });
          toast.warn('Warning notification!', {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          toast.error('Error notification!', {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          toast.dark('Dark notification!', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }}
      >
        {image}
      </button>
    </div>
  );
}

export default TrophyButton;
