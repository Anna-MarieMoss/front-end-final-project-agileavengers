import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAppContext } from './AppContext';
import './App.css';
import './global.css';
import { ThemeContext } from './ThemeContext';
// App Component Pages
import Welcome from './Components/2.Welcome_Page';
import Emotions from './Components/3.Emotions_Page';
import JournalEntry from './Components/4.Journal_Entry_Page';
import JournalView from './Components/5.Journal_View_Page';
import Timeline from './Components/6.Timeline_Page';
import Trophy from './Components/7.Trophy_Page';
import Stats from './Components/8.Stats_Page';
import Profile from './Components/1b.Profile_Page';
import Logout from './Components/9.Logout_Page/index';
import UsersMood from './Components/10.UsersMood/index.js';
// Material UI Imports
import { ThemeProvider } from '@material-ui/core/styles';

function App() {
  const { isLoading } = useAppContext();
  const { checkDarkState, theme } = useAppContext();

  // Wait While Authentication is loading
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className='App' id={checkDarkState}>
      <ThemeContext.Provider value={checkDarkState}>
        <ThemeProvider theme={theme}>
          <Router>
            <div className='nav-bar'>
              <Switch>
                <Route path='/profile'>
                  <Profile />
                </Route>
                <Route path='/emotions'>
                  <Emotions />
                </Route>
                <Route path='/journalentry'>
                  <JournalEntry />
                </Route>
                <Route path='/journalview'>
                  <JournalView />
                </Route>
                <Route path='/timeline'>
                  <Timeline />
                </Route>
                <Route path='/trophy'>
                  <Trophy />
                </Route>
                <Route path='/stats'>
                  <Stats />
                </Route>
                <Route path='/usersmood'>
                  <UsersMood />
                </Route>
                <Route path='/logout'>
                  <Logout />
                </Route>
                <Route path='/'>
                  <Welcome />
                </Route>
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
