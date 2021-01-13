import React, { useEffect, useState, useContext } from 'react';
import { useAppContext } from '../../AppContext';
// import { Trophies } from './Trophies.js'; //need to add additional trophies to this file
import TrophyButton from '../Buttons/TrophyButton/index';
import H1 from '../DisplayText/H1Text/index';
import { ThemeContext } from '../../ThemeContext';
import '../../App.css';
import './trophies.css';
import { ToastContainer, Slide } from 'react-toastify';
import { Typography } from '@material-ui/core';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';
import { useHistory } from 'react-router';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Trophy() {
  const theme = useContext(ThemeContext);
  const { userData, isAuthenticated, isLoading, accessToken } = useAppContext();
  const [award, setAward] = useState();
  const history = useHistory();

  if (!isAuthenticated) {
    history.push('/');
  }

  let user_Id = userData?.id; //we need to get this from the app context

  useEffect(() => {
    if (user_Id) {
      async function getAllTrophies() {
        const res = await fetch(`${BACKEND_URL}/trophies/${user_Id}`, {
          headers: {
            'content-type': 'application/JSON',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        // console.log( `data is  ${JSON.stringify(data)}`);
        console.log(`data payload is `, data.payload);
        // console.log(`data is ${JSON.stringify(data.payload[0].mood)}`)
        setAward(data.payload);
        console.log(`award state is`, award);
        //chartConfig.data.datasets[0].data = graphData.map((x) => x.mood);
      }
      getAllTrophies();
    }
  }, [setAward]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div id={theme}>
        <NavTop />
        <ToastContainer
          transition={Slide} // changes the transition to a slide rather than a bounce.
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className={'trophycontainer'}>
          <H1 text={`${userData?.name}'s Trophy Cabinet`} />
          <br></br>
          <Typography variant='h6'>
            {' '}
            You're fast becoming a coding ninja!<br></br>
            <img
              src='https://cdn1.iconfinder.com/data/icons/ninja-things-1/720/ninja-background-512.png'
              alt='ninja'
              height='15%'
              width='15%'
              className='center'
            />
            <br></br>
            Click below to claim your trophy, as you master each new skill.
          </Typography>
          <br></br>
          <br></br>
          <div className='trophy-display'>
            {award?.map((trophy) => (
              <TrophyButton
                className='trophy-button'
                path={trophy.path}
                id={trophy.id}
                name={trophy.name}
                color={trophy.color}
                awarded={trophy.awarded}
              />
            ))}
          </div>
        </div>
        <NavBar />
      </div>
    )
  );
}
export default Trophy;
