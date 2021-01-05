import React, { createContext, useContext, useState, useEffect } from 'react';
import { progressPosition } from './progressFunction';
import { useAuth0 } from '@auth0/auth0-react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentWeek, setCurrentWeek] = useState('week1');
  
  // Need to get start date from our database
  let startDate = 'Oct 22 2020';

  // Auth0 - data
  const { user, isAuthenticated, isLoading , getAccessTokenSilently} = useAuth0();
  // const [userMetadata, setUserMetadata] = useState(null);
  
  const emotionsArray = [
    { emotion: '😢', number: 1 },
    { emotion: '😒', number: 2 },
    { emotion: '😬', number: 3 },
    { emotion: '😀', number: 4 },
    { emotion: '😍', number: 5 },
  ];

  useEffect(() => {
    let week = progressPosition(startDate);
    setCurrentWeek(week);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentWeek: currentWeek,
        user: user,
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        emotionsArray: emotionsArray,
        getAccessTokenSilently: getAccessTokenSilently,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
