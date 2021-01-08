import React, { createContext, useContext, useState, useEffect } from 'react';
import { progressPosition } from './progressFunction';
import { useAuth0 } from '@auth0/auth0-react';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentWeek, setCurrentWeek] = useState('week1');
  const [userData, setuserData] = useState({});

  // Auth0 - data
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [accessToken, setaccessToken] = useState(null);

  const emotionsArray = [
    { emotion: '😢', number: 1 },
    { emotion: '😒', number: 2 },
    { emotion: '😬', number: 3 },
    { emotion: '😀', number: 4 },
    { emotion: '😍', number: 5 },
  ];

  // Auth0 get token
  useEffect(() => {
    if (user) {
      const getAccessToken = async () => {
        const domain = 'dev-ip1x4wr7.eu.auth0.com';

        try {
          const accessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: 'read:current_user',
          });

          setaccessToken(accessToken);
        } catch (e) {
          console.log(e.message);
        }
      };
      getAccessToken();
    }
  }, [user, getAccessTokenSilently]);

  //Get user profile based on email (Auth0 response)
  useEffect(() => {
    if (user?.email && accessToken) {
      console.log('Im getting user data');
      async function getProfile() {
        const res = await fetch(`${BACKEND_URL}/users/${user?.email}`, {
          headers: {
            'content-type': 'application/JSON',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        setuserData(data.payload[0]); //expect to get start date
        console.log(data.payload[0], 'userdata from email fetch');
      }
      getProfile();
    }
  }, [user, accessToken]);

  // Get the current week based on the start date from our DB
  useEffect(() => {
    let week = progressPosition(userData?.start_date);
    setCurrentWeek(week);
  }, [userData]);

  return (
    <AppContext.Provider
      value={{
        currentWeek: currentWeek,
        user: user,
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        emotionsArray: emotionsArray,
        accessToken: accessToken,
        userData: userData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
