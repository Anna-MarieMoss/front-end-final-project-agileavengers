import React from 'react';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text/index';
import Graph from '../Graphs/index';
import './Stats.css';
import { Typography } from '@material-ui/core';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';

function Stats() {
  const { isAuthenticated, isLoading, userData } = useAppContext();

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  const name = userData ? userData.name : '';

  return (
    <div className={'stats'}>
    <NavTop />
      <div className='container'>
        <H1 text={`Your Mood Stats`} />
        <Typography variant='h6'>
          Display your mood throughout the bootcamp
        </Typography>
        <br></br>
        <Graph />
      </div>
      <NavBar />
    </div>
  );
}

export default Stats;
