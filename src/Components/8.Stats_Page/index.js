import React from 'react';
import { useAppContext } from '../../AppContext';
import H2 from '../DisplayText/H2Text/index';
import Graph from '../Graphs/index';
import {Typography} from '@material-ui/core';

function Stats() {
  const { user, isAuthenticated, isLoading, userData } = useAppContext();

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  return (
    <div>
      <H2 text={`${userData.name}'s Stats`} />
      <Typography variant="h6">Display your mood throughout the bootcamp</Typography>
      <Graph />
    </div>
  );
}

export default Stats;
