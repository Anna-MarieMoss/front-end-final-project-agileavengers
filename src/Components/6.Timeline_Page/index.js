import React, { useState, useEffect, useContext } from 'react';
import ProgressBar from '../ProgressBar/index';
import { ThemeProvider } from '../ProgressBar/themeContext';
import H2 from '../DisplayText/H2Text/index';
import H1 from '../DisplayText/H1Text/index';
import congratsData from './congratsData';
import { useAppContext } from '../../AppContext';
import { ThemeContext } from '../../ThemeContext';

function Timeline() {
  const { currentWeek, user, isAuthenticated, isLoading } = useAppContext();
  const [congratsMessage, setcongratsMessage] = useState(null);
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

  //Dark / Light Theme
  const theme = useContext(ThemeContext);

  if (isLoading) {
    return <div id={theme}>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div id={theme}>
        <div>
          <H1 text={'Your Timeline'} />
          <H2 text={congratsMessage} />
          <ThemeProvider>
            <ProgressBar week={currentWeek} />
          </ThemeProvider>
        </div>
      </div>
    )
  );
}

export default Timeline;
