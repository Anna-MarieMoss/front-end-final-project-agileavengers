import React from 'react';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text/index';
import Graph from '../Graphs/index';

function Stats() {
  const { user, isAuthenticated, isLoading, userData } = useAppContext();

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  return (
    <div>
      <H1 text={`${userData.name}'s Stats`} />
      <p> (Mood chart )</p>
      <Graph />.<p> (Add in number of posts here!?!)</p>
    </div>
  );
}

export default Stats;
