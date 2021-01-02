import { render } from '@testing-library/react';
import React from 'react';
import Emotions from './index'

test('emotions buttons should render properly', () => {
    const {getByTestId} = render(<Emotions />);
    expect(getByTestId()).toBeInTheDocument();
})