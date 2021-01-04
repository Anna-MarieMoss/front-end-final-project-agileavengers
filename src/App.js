import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useAppContext } from './AppContext';
import './App.css';
import './global.css';

// App Component Pages
import Welcome from './Components/2.Welcome_Page';
import Emotions from './Components/3.Emotions_Page';
import JournalEntry from './Components/4.Journal_Entry_Page';
import JournalView from './Components/5.Journal_View_Page';
import Timeline from './Components/6.Timeline_Page';
import Trophy from './Components/7.Trophy_Page';
import Stats from './Components/8.Stats_Page';
import Profile from './Components/1b.Profile_Page';
import LogIn from './Components/1.Login_Page/index';
import Logout from './Components/9.Logout_Page/index';

// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EmojiEventsRoundedIcon from '@material-ui/icons/EmojiEventsRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Need to figure out how to get the login page to work when the user isnt authenticated as at the moment they can only see it when they are authenticated which is a bug!!

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0px',
    backgroundColor: '#31986a',
  },
});

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isAuthenticated, isLoading } = useAppContext();

  //Handles the Expanded Navigation
  const navClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //Handles the Selected Expanded Navigation
  const navClose = () => {
    setAnchorEl(null);
  };

  // Wait While Authentication is loading
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // If Authenticated render the App
  // BUG - Login Page only loads if User is Logged in and Authenticated
  return (
    !isAuthenticated && (
      <div className='App'>
        <Router>
          <div className='nav-bar'>
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels={false}
              className={classes.root}
            >
              <BottomNavigationAction
                component={Link}
                to='/profile'
                label='Profile'
                value='profile'
                icon={<FaceRoundedIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to='/journalview'
                label='Journal'
                value='journal'
                icon={<EditRoundedIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to='/timeline'
                label='TimeLine'
                value='timeline'
                icon={<ScheduleRoundedIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to='/trophy'
                label='Trophies'
                value='trophies'
                icon={<EmojiEventsRoundedIcon />}
              />
              <BottomNavigationAction
                icon={<MenuRoundedIcon />}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={navClick}
              />
              <Menu
                id='app-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={navClose}
              >
                <MenuItem
                  className='menu-item'
                  component={Link}
                  to='/welcome'
                  onClick={navClose}
                >
                  Welcome
                </MenuItem>
                <MenuItem
                  className='menu-item'
                  component={Link}
                  to='/emotions'
                  onClick={navClose}
                >
                  Emotions
                </MenuItem>
                <MenuItem
                  className='menu-item'
                  component={Link}
                  to='/journalentry'
                  onClick={navClose}
                >
                  Journal Entry
                </MenuItem>
                <MenuItem
                  className='menu-item'
                  component={Link}
                  to='/stats'
                  onClick={navClose}
                >
                  Stats
                </MenuItem>
                <MenuItem
                  className='menu-item'
                  component={Link}
                  to='/logout'
                  onClick={navClose}
                >
                  Logout
                </MenuItem>
              </Menu>
            </BottomNavigation>

            <Switch>
              <Route path='/welcome'>
                <Welcome />
              </Route>
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
              <Route path='/logout'>
                <Logout />
              </Route>
              <Route path='/'>
                <LogIn />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  );
}

export default App;
