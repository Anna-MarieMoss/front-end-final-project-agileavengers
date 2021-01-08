import React, { useContext, useState, useEffect } from 'react';
// import toaster from 'toasted-notes';
import './TrophyButton.css';
import 'toasted-notes/src/styles.css';
import { ThemeContext } from '../../../ThemeContext';
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
import { useAppContext } from '../../../AppContext';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function TrophyButton({ name, path, id, color, awarded }) {
  const theme = useContext(ThemeContext);
  const [click, setClick] = useState(0);
  const [trophyColor, setTrophyColor] = useState(awarded ? color : '#384D54');
  const [trophyAwarded, setTrophyAwarded] = useState(awarded);
  const { user, isAuthenticated, isLoading, accessToken } = useAppContext();
  async function patchTrophy() {
    const res = await fetch(`${BACKEND_URL}/trophies/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/JSON',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    console.log(data);
    console.log('Patch Done');
    limitClicks();
    setTrophyAwarded(!trophyAwarded);
    // const data = await res.json();
    // // console.log( `data is  ${JSON.stringify(data)}`);
    // console.log(`data payload is `, data.payload);
    // // console.log(`data is ${JSON.stringify(data.payload[0].mood)}`)
    // setAward(data.payload);
    // console.log(`award state is`, award);
    //chartConfig.data.datasets[0].data = graphData.map((x) => x.mood);
  }
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
  // useEffect(
  //   () =>
  //     async function handleTrophy(changingColor) {
  //       document.getElementById(id).setAttribute('fill', color);
  //       limitClicks();
  //       setTrophyColor(trophyAwarded ? color : '#384D54');
  //       //TO DO: send patch? request to database to change boolean to T/F. How do we populate the database with the trophies- post request on sign up that creates trophies as boolean 'false'?
  //       // async function patchTrophy() {
  //       //   const res = await fetch(`${BACKEND_URL}/trophies`, {
  //       //     method: 'PATCH',
  //       //     headers: { 'content-type': 'application/JSON' },
  //       //     body: JSON.stringify({
  //       //       userId: user_Id, // this needs to be bought in from app context
  //       //       trophyName: id, //need to change this to match the database
  //       //       awarded: true,
  //       //     }),
  //       //   });
  //       //   const data = await res.json();
  //       //   console.log(data);
  //       // }
  //       patchTrophy();
  //     },
  //   [trophyAwarded]
  // );
  function toggleTrophyAwarded() {
    setTrophyAwarded(!trophyAwarded);
  }
  function limitClicks() {
    // Fetch Trophy boolean
    // useEffect(() => {
    //   async function getTrophy() {
    //     const res = await fetch(`${BACKEND_URL}/trophies/1`);
    //     const data = await res.json();
    //     // console.log( `data is  ${JSON.stringify(data)}`);
    //     console.log(`data payload is `, data.payload);
    //     // console.log(`data is ${JSON.stringify(data.payload[0].mood)}`)
    //     setClick(data.payload);
    //     console.log(`click state is`, graphData);
    //     //chartConfig.data.datasets[0].data = graphData.map((x) => x.mood);
    //   }
    //   getTrophy();
    // }, [click]);
    //
    if (click < 1 && !trophyAwarded) {
      //  document.getElementsByClassName('trophyButton')
      setClick(click + 1);
      console.log(`click is`, click);
      toast.info(`Congratulations, you've mastered a new skill!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      //console.log (`my state is`)
    } else {
      // document.getElementsByClassName('trophyButton').setAttribute.disabled = true
      //document.getElementById(id).setAttribute.disabled = true
    }
  }

  return (
    <div id={theme}>
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
      <button
        id={theme}
        className='trophyButton'
        style={{ border: '0px', strokeOpacity: '0' }}
        // onClick={() => {
        //   handleTrophy(color);
        // }}
        onClick={patchTrophy}
        // toaster.notify(`Congratulations, you've mastered a new skill!`, {
        //   duration: 2000,
        // });
        // toast('Wow so easy !');
        // toast.success('Success notification!', {
        //   position: toast.POSITION.TOP_LEFT,
        // });
        // toast.info(`Congratulations, you've mastered a new skill!`, {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
        // toast.warn('Warning notification!', {
        //   position: toast.POSITION.BOTTOM_LEFT,
        // });
        // toast.error('Error notification!', {
        //   position: toast.POSITION.BOTTOM_CENTER,
        // });
        // toast.dark('Dark notification!', {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        // });
      >
        <svg
          role='img'
          id={id}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          width='3em'
          height='3em'
          fill={trophyAwarded ? color : '#384D54'}
        >
          <title>{name}</title>
          <path d={path} />
        </svg>
      </button>
    </div>
  );
}
export default TrophyButton;
