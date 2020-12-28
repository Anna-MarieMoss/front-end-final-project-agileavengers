import React from 'react';
import { Trophies } from './Trophies.js'; //need to add additional trophies to this file
import TrophyButton from '../Buttons/TrophyButton/index';

function Trophy() {
  return (
    <div>
      <h1>Your Trophy Cabinet</h1>
      <p> (Add in a grid of the skill buttons with logo imgs)</p>

      {Trophies.map((trophy) => (
        <TrophyButton
          image={trophy.image}
          id={trophy.id}
          color={trophy.color}
        />
      ))}
    </div>
  );
}

export default Trophy;
