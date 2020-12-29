import React, { useState, useEffect } from 'react';
import ProgressBar from '../ProgressBar/index';
import { ThemeProvider } from '../ProgressBar/themeContext';
import H2 from '../DisplayText/H2Text/index';
import congratsData from './congratsData';
import { useAppContext } from '../../AppContext';

function Timeline() {
  const { currentWeek } = useAppContext();
  const [congratsMessage, setcongratsMessage] = useState('working');
  // console.log(`in timeline ${currentWeek}, ${congratsMessage}`);

  useEffect(() => {
    if (currentWeek) {
      let res = congratsData.filter((congratsData) => {
        if (congratsData.week === currentWeek) {
          console.log(congratsData.message);
          return true;
        }
        return false;
      });
      console.log(res);
      setcongratsMessage(res.message);
      console.log(`this is your congrats message pls work ${congratsMessage}`);
    }
  }, []);

  return (
    <div>
      <h1>Your Timeline</h1>
      <p> (Add in progress bar here)</p>
      <p> (Add in progress congratulations message here)</p>
      <H2 text={congratsMessage}></H2>
      <ThemeProvider>
        <ProgressBar />
      </ThemeProvider>
    </div>
  );
}

export default Timeline;

// h2 that is dynamically pulled in from array based on week
// use reusable h2
// create array with congratulations week and week
//import congrats
//import function to figure out date
// if statement to show correct statement
