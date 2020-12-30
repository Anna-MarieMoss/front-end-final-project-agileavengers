import React from 'react';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text/index';

function Welcome() {
  const { user, isAuthenticated, isLoading } = useAppContext();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
    <div>
    <H1 text={`Hi ${user.given_name} Welcome to your SoC Journal`} />
      <p>
        Your personal space to record your once in a lifetime School of Code
        experience!
      </p>
      <p>
        There will be highs and low, tears and tantrums, but you’re going to
        want to remember this experience and how you grew forever.
      </p>
    </div>
  )
  )
}

export default Welcome;
