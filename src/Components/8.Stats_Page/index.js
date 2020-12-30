import React from 'react';
import { useAppContext } from '../../AppContext';

function Stats() {
  const { currentWeek, user, isAuthenticated, isLoading } = useAppContext();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
    <div>
      <h1>Your Stats</h1>
      <p> (Add in mood graph here!)</p>
      <p> (Add in number of posts here!?!)</p>
    </div>
  )
  )
}

export default Stats;
