import React, { createContext, useContext, useState, useEffect } from 'react';
import { progressPosition } from './progressFunction';
import { useAuth0 } from '@auth0/auth0-react';
import { createMuiTheme } from '@material-ui/core/styles';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentWeek, setCurrentWeek] = useState('week1');
  const [userData, setuserData] = useState({});
  const [submit, setSubmit] = useState(false);

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

  //Get user profile based on email (Auth0 response) - NEW VERSION
  useEffect(() => {
    if (user?.email && accessToken) {
      console.log(BACKEND_URL, user.email);
      fetch(`${BACKEND_URL}/users/${user?.email}`, {
        headers: {
          'content-type': 'application/JSON',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setuserData(data.payload[0]);
          let week = progressPosition(data.payload[0].start_date);
          setCurrentWeek(week);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [user, accessToken, submit]);

  //THEMES
  const [darkState, setDarkState] = useState(false);
  const [muiDarkState, setMuiDarkState] = useState(false);

  //Toggles the dark and light theme
  const handleThemeChange = () => {
    setDarkState(!darkState);
    setMuiDarkState(!muiDarkState);
  };
  //Chooses correct CSS id name based on the darkState
  const checkDarkState = darkState ? 'darkTheme' : 'lightTheme';

  const theme = createMuiTheme({
    palette: {
      type: darkState ? 'dark' : 'light',
      primary: {
        light: '#ac5457',
        main: '#f7797d',
        dark: '#f89397',
        // contrastText: '#fff',
      },
      secondary: {
        light: '#8ab29a',
        main: '#C6FFDD',
        dark: '#d1ffe3',
        // contrastText: '#000',
      },
      neutral: {
        main: '#303030',
      },
    },
  });

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
        setSubmit: setSubmit,
        submit: submit,
        handleThemeChange: handleThemeChange,
        darkState: darkState,
        checkDarkState: checkDarkState,
        theme: theme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
