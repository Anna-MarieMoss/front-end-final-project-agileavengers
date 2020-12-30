import React from 'react';
import { useAppContext } from '../../AppContext';

function JournalView() {
  const { currentWeek, user, isAuthenticated, isLoading } = useAppContext();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
    <div>
      <h1>Your story so far...</h1>
      <p> (Display all journal component cards here)</p>
      <p>(Add in filters for date range, emotions etc)</p>
    </div>
  )
  )
}

export default JournalView;
