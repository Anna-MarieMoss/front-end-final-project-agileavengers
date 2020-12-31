import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EmojiEventsRoundedIcon from '@material-ui/icons/EmojiEventsRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import MultilineChartRoundedIcon from '@material-ui/icons/MultilineChartRounded';
// import DehazeRoundedIcon from '@material-ui/icons/DehazeRounded';
// import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
// import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';


// Do we want to use badges to tell them if theyve unlocked nay trophies or timeline events?
// Would be pretty cool
// Bottom Naviagation acts differently on android and ios
// Badeges such as how many email on the icon?

// Whe want to be able to use a Nav Bar to navigate through our App
// IOS the NavBar is at the Bottom of the Page
// Android NavBar is at the Top of the Page


const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      
      <BottomNavigationAction label="Profile" icon={<FaceRoundedIcon />} />
      <BottomNavigationAction label="Journal" icon={<EditRoundedIcon />} />
      <BottomNavigationAction label="TimeLine" icon={<ScheduleRoundedIcon />} />
      <BottomNavigationAction label="Trophies" icon={<EmojiEventsRoundedIcon />} />
      <BottomNavigationAction icon={<MenuRoundedIcon  />} />
    </BottomNavigation>
  );
}

// Removed Nav Icons - think I wil make a dropdown menu
/* <BottomNavigationAction label="Emotions" icon={<FavoriteIcon />} />
<BottomNavigationAction label="Stats" icon={<MultilineChartRoundedIcon />} />
 */

/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
  Open Menu
</Button>
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={handleClose}>Profile</MenuItem>
  <MenuItem onClick={handleClose}>My account</MenuItem>
  <MenuItem onClick={handleClose}>Logout</MenuItem>
</Menu> */