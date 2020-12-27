import { render } from '@testing-library/react';

import React from 'react';

import ProgressBar from './index';
import { progressPosition } from './progressFunction';

//test to show progress bar rending on page

test('ProgressBar component renders', () => {
  const { getByTestId } = render(<ProgressBar />);
  const progressBar = getByTestId('progressbar-display');
  expect(progressBar).toBeInTheDocument();
});

//test function for date

test(`the progressPosition function returns week1 when todays date is given`, () => {
  const actual = progressPosition(new Date());
  const expected = 'week1';

  expect(actual).toBe(expected);
});

//NOT WORKING YET
// test(`the progressPosition function returns week2 when a date 2 weeks from todays date is given`, () => {
//   const date = new Date();
//   const twoWeeksTime = date.setDate(date.getDate() + 14);
//   console.log(twoWeeksTime);
//   const actual = progressPosition(twoWeeksTime);
//   const expected = 'week2';

//   expect(actual).toBe(expected);
// });

//test shows correctly as grey or coloured
