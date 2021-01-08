import React, { useEffect, useState, useContext } from 'react';
import { useAppContext } from '../../AppContext';
import { Trophies } from './Trophies.js'; //need to add additional trophies to this file
import TrophyButton from '../Buttons/TrophyButton/index';
import H1 from '../DisplayText/H1Text/index';
import { ThemeContext } from '../../ThemeContext';
import '../../App.css';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Trophy() {
  const theme = useContext(ThemeContext);
  const {
    userData,
    isAuthenticated,
    isLoading,
    accessToken,
    user,
  } = useAppContext();
  const [award, setAward] = useState();

  let user_Id = 1; //we need to get this from the app context

  // useEffect(() => {
  //   async function getTrophies() {
  //     const res = await fetch(`${BACKEND_URL}/trophies/${user_Id}`); //Need to check correct URL
  //     const { payload } = await res.json();
  //     console.log(payload); //this would return all trophies data
  //   }
  //   getTrophies();
  // }, []);

  // get trophy fetch
  useEffect(() => {
    if (user_Id) {
      async function getAllTrophies() {
        const res = await fetch(`${BACKEND_URL}/trophies/${user_Id}`);
        const data = await res.json();

        console.log(`data payload is `, data.payload);

        setAward(data.payload);
        console.log(`award state is`, award);
      }
      getAllTrophies();
    }
  }, [setAward]);
  //
  console.log(`updated state is`, award);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div id={theme}>
        <H1 text={`${user?.given_name}'s Trophy Cabinet`} />
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
  );
}

export default Trophy;
