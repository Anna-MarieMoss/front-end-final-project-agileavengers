import React from 'react';
import ProgressBar from '../ProgressBar/index';
import { ThemeProvider } from '../ProgressBar/themeContext';

function Timeline() {
  return (
    <div>
      <h1>Your Timeline</h1>
      <p> (Add in progress bar here)</p>
      <p> (Add in progress congratulations message here)</p>
      <ThemeProvider>
        <ProgressBar />
      </ThemeProvider>
    </div>
  );
}

export default Timeline;
