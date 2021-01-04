import React from 'react';
import { useAppContext } from '../../AppContext';
import { Trophies } from './Trophies.js'; //need to add additional trophies to this file
import TrophyButton from '../Buttons/TrophyButton/index';
import H1 from '../DisplayText/H1Text/index';

function Trophy() {
  const { currentWeek, user, isAuthenticated, isLoading } = useAppContext();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
    <div>
    <H1 text={`${user.given_name}'s Trophy Cabinet`}/>
      <p> (Add in a grid of the skill buttons with logo imgs)</p>
      {Trophies.map((trophy) => (
        <TrophyButton
          image={trophy.image}
          id={trophy.id}
          color={trophy.color}
        />
      ))}
    </div>
  )
  )
}

export default Trophy;
