import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React, { useContext } from 'react';
import './NavBar.css';
// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EmojiEventsRoundedIcon from '@material-ui/icons/EmojiEventsRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ToggleButton } from '@material-ui/lab';
import BrightnessIcon4 from '@material-ui/icons/Brightness4';
import { useAppContext } from '../../AppContext';
import { ThemeContext } from '../../ThemeContext';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0px',
    background: 'linear-gradient(90deg, #f7797d, #FBD786, #C6FFDD)',
  },
});

function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { handleThemeChange, darkState } = useAppContext();
  //Dark / Light Theme
  const theme = useContext(ThemeContext);
  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

  //Handles the Expanded Navigation
  const navClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //Handles the Selected Expanded Navigation
  const navClose = () => {
    setAnchorEl(null);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      // showlabel={false}
      className={classes.root}
      id='navbarshow'
    >
      <BottomNavigationAction
        component={Link}
        to='/journalview'
        label='Journal'
        value='journal'
        icon={<MenuBookIcon color='type' />}
      />
      <BottomNavigationAction
        component={Link}
        to='/timeline'
        label='TimeLine'
        value='timeline'
        icon={<ScheduleRoundedIcon color='type' />}
      />
      <BottomNavigationAction
        component={Link}
        to='/trophy'
        label='Trophies'
        value='trophies'
        icon={<EmojiEventsRoundedIcon color='type' />}
      />
      <BottomNavigationAction
        icon={<MenuRoundedIcon color='type' />}
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
        <MenuItem className='menu-item' onClick={navClose}>
          <ToggleButton
            value='check'
            selected={darkState}
            onChange={handleThemeChange}
          >
            <BrightnessIcon4 />
          </ToggleButton>
        </MenuItem>
        <MenuItem
          className='menu-item'
          component={Link}
          to='/mood'
          onClick={navClose}
          icon={<EmojiEventsRoundedIcon />}
        >
          Your Mood
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
          Your Stats
        </MenuItem>
        <MenuItem
          className='menu-item'
          component={Link}
          to='/usersmood'
          onClick={navClose}
        >
          General Mood
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
  );
}

export default NavBar;
