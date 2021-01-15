import React from 'react';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text/index';
import Graph from '../Graphs/index';
import './Stats.css';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';
import { useHistory } from 'react-router';

function Stats() {
  const { isAuthenticated } = useAppContext();
  const history = useHistory();

  if (!isAuthenticated) {
    history.push('/');
  }

  return (
    isAuthenticated && (
      <div className={'stats'}>
        <NavTop />
        <div style={{ marginBottom: 0 }}>
          <div className={'stats'}>
            <H1 text={`Mood Stats`} />
            <Typography variant='h6'>Review your previous moods.</Typography>
            {/* <Typography variant='h6'>
            Display your mood throughout the bootcamp
          </Typography> */}
            <br></br>
            <Graph />
          </div>

        </div>
        <NavBar />
      </div>
    )
  );
}

export default Stats;
