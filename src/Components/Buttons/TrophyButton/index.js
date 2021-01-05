import React from 'react';

//Backend URL
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function TrophyButton({ image, id, color }) {
  // let user_Id = 1;  //we need to get this from the app context

  // onclick function that sets background colour to fill and also sends patch/post request to the database to turn boolean to true

  function handleTrophy(changingColor) {
    document.getElementById(id).setAttribute('fill', changingColor);
    //TO DO: send patch? request to database to change boolean to T/F. How do we populate the database with the trophies- post request on sign up that creates trophies as boolean 'false'?

    // async function patchTrophy() {
    //   const res = await fetch(`${BACKEND_URL}/trophies`, {
    //     method: 'PATCH',
    //     headers: { 'content-type': 'application/JSON' },
    //     body: JSON.stringify({
    //       userId: user_Id, // this needs to be bought in from app context
    //       trophyName: id, //need to change this to match the database
    //       awarded: true,
    //     }),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    // }
    // patchTrophy();
  }

  return (
    <button
      style={{ backgroundColor: 'white', border: '0px' }}
      onClick={() => {
        handleTrophy(color);
      }}
    >
      {image}
    </button>
  );
}

export default TrophyButton;
