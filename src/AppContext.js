import React, { createContext, useContext, useState, useEffect } from 'react';
import { progressPosition } from './progressFunction';
import { useAuth0 } from '@auth0/auth0-react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentWeek, setCurrentWeek] = useState('week1');
  let startDate = 'Oct 22 2020';
  const { user } = useAuth0();

  useEffect(() => {
    let week = progressPosition(startDate);
    setCurrentWeek(week);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentWeek: currentWeek,
        user: user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
