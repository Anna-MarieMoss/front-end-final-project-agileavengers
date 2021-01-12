import React from 'react';
import { useAppContext } from '../../AppContext';
import H2 from '../DisplayText/H2Text/index';
import Graph from '../Graphs/index';
import './Stats.css';
import { Typography } from '@material-ui/core';

function Stats() {
  const { isAuthenticated, isLoading, userData } = useAppContext();

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  const name = userData ? userData.name : '';

  return (
    <div className={'stats'}>
      <div className='container'>
        <H2 text={`${name}'s Stats`} />
        <Typography variant='h6'>
          Display your mood throughout the bootcamp
        </Typography>
        <br></br>
        <Graph />
      </div>
    </div>
  );
}

export default Stats;
