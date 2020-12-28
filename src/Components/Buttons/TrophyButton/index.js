import React from 'react';

function TrophyButton({ image, id, color }) {
  //async function to check the database. If T/F boolean true turn background colour to fill

  // onclick function that sets background colour to fill and also sends patch/post request to the database to turn boolean to true

  function handleTrophy(changingColor) {
    document.getElementById(id).setAttribute('fill', changingColor);
    //TO DO: send post reuqest to database to change boolean to T/F
  }
  return (
    <button
      onClick={() => {
        handleTrophy(color);
      }}
    >
      {image}
    </button>
  );
}

export default TrophyButton;
