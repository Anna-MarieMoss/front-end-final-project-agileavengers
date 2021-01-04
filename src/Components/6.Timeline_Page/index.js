import React, { useState, useEffect } from 'react';
import ProgressBar from '../ProgressBar/index';
import { ThemeProvider } from '../ProgressBar/themeContext';
import H2 from '../DisplayText/H2Text/index';
import H1 from '../DisplayText/H1Text/index';
import congratsData from './congratsData';
import { useAppContext } from '../../AppContext';


function Timeline() {
  const { currentWeek, user, isAuthenticated, isLoading } = useAppContext();
  const [congratsMessage, setcongratsMessage] = useState('Isabel');
  // console.log(`in timeline ${currentWeek}, ${congratsMessage}`);

  useEffect(() => {
    if (currentWeek) {
      let res = congratsData.filter((congratsData) => {
        if (congratsData.week === currentWeek) {
          return true;
        }
        return false;
      });
      setcongratsMessage(res[0].message);
    }
  }, [currentWeek, congratsMessage]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
    <div>
      <H1 text={'Your Timeline'}/>
      <H2 text={congratsMessage}/>
      <ThemeProvider>
        <ProgressBar pic={user.picture} week={currentWeek}/>
      </ThemeProvider>
    </div>
  ));
}

export default Timeline;
