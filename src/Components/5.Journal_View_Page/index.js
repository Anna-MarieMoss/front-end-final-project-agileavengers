import React from 'react';
import { useAppContext } from '../../AppContext';
import H1 from '../DisplayText/H1Text/index';

function JournalView() {
  const { currentWeek, user, isAuthenticated, isLoading } = useAppContext();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
    <div>
      <H1 text={`${user.given_name}'s journey so far....`} />
      <p> (Display all journal component cards here)</p>
      <p>(Add in filters for date range, emotions etc)</p>
    </div>
  )
  )
}

export default JournalView;
