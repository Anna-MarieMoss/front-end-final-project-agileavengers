import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EmojiEventsRoundedIcon from '@material-ui/icons/EmojiEventsRounded';
import MultilineChartRoundedIcon from '@material-ui/icons/MultilineChartRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function SimpleBottomNavigation() {
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
      <BottomNavigationAction label="Emotions" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Journals" icon={<EditRoundedIcon />} />
      <BottomNavigationAction label="Stats" icon={<MultilineChartRoundedIcon />} />
      <BottomNavigationAction label="TimeLine" icon={<ScheduleRoundedIcon />} />
      <BottomNavigationAction label="Trophies" icon={<EmojiEventsRoundedIcon />} />
    </BottomNavigation>
  );
}