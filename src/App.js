import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import './global.css';
import Welcome from './Components/2.Welcome_Page';
import Emotions from './Components/3.Emotions_Page';
import JournalEntry from './Components/4.Journal_Entry_Page';
import JournalView from './Components/5.Journal_View_Page';
import Timeline from './Components/6.Timeline_Page';
import Trophy from './Components/7.Trophy_Page';
import Stats from './Components/8.Stats_Page';
import Profile from './Components/1b.Profile_Page';
import NavBar from './Components/NavBar/index';
import Upload from './Components/4.Journal_Entry_Page/cloudinaryUpload';
import LogIn from './Components/1.Login_Page/index';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Log In</Link>
              </li>
              <li>
                <Link to='/welcome'>Welcome</Link>
              </li>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/emotions'>Emotions</Link>
              </li>
              <li>
                <Link to='/journalentry'>Journal Entry</Link>
              </li>
              <li>
                <Link to='/journalview'>Journal View</Link>
              </li>
              <li>
                <Link to='/timeline'>Timeline</Link>
              </li>
              <li>
                <Link to='/trophy'>Trophies</Link>
              </li>
              <li>
                <Link to='/stats'>Statistics</Link>
              </li>
              <li>
                <Link to='/upload'>Upload</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

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
            <Route path='/upload'>
              <Upload />
            </Route>
            <Route path='/'>
              <LogIn />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
