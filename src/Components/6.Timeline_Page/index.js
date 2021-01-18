import React, { useState, useEffect, useContext } from 'react';
import ProgressBar from '../ProgressBar/index';
import { ThemeProvider } from '../ProgressBar/themeContext';
import H2 from '../DisplayText/H2Text/index';
import H1 from '../DisplayText/H1Text/index';
import congratsData from './congratsData';
import { useAppContext } from '../../AppContext';
import { ThemeContext } from '../../ThemeContext';
import Nav from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';
import { useHistory } from 'react-router';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  h6: {
    padding: '1em',
  },
});

function Timeline() {
  const { currentWeek, isAuthenticated, isLoading } = useAppContext();
  const [congratsMessage, setcongratsMessage] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  if (!isAuthenticated) {
    history.push('/');
  }

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
        <NavTop />
        <div className='timeline-container'>
          <H1 text={'Your Journey'} />
          <Typography variant='h6' className={classes.h6}>
            {congratsMessage}
          </Typography>
          <ThemeProvider>
            <ProgressBar week={currentWeek} />
          </ThemeProvider>
        </div>
        <Nav />
      </div>
    )
  );
}

export default Timeline;
