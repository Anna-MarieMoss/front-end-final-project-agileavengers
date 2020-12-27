import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import GitHubIcon from '@material-ui/icons/GitHub';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import FunctionsIcon from '@material-ui/icons/Functions';
import CodeIcon from '@material-ui/icons/Code';
import StorageIcon from '@material-ui/icons/Storage';
import DevicesIcon from '@material-ui/icons/Devices';
import BuildIcon from '@material-ui/icons/Build';
import RouterIcon from '@material-ui/icons/Router';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import LockIcon from '@material-ui/icons/Lock';
import GroupIcon from '@material-ui/icons/Group';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { themeSwitch, dotSwitch } from './theme';
import { useThemeContext } from './themeContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function ProgressBar() {
  const {
    week1,
    week2,
    week3,
    week4,
    week5,
    week6,
    week7,
    week8,
    week9,
    week10,
    week11,
    week12,
    week16,
  } = useThemeContext();
  const classes = useStyles();

  return (
    <Timeline align='alternate' data-testid='progressbar-display'>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant='body2' color='textSecondary'>
            Coding Newbie
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week1 ? 'dark' : 'light']}>
            <GitHubIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week1 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 1
            </Typography>
            <Typography>You learnt GitHub & Javascript</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant='body2' color='textSecondary'>
            Coding SOMETHING
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week2 ? 'dark' : 'light']}>
            <FunctionsIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week2 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 2
            </Typography>
            <Typography>You mastered advance Javascript</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week3 ? 'dark' : 'light']}>
            <CodeIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week3 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 3
            </Typography>
            <Typography>You're a Node & Express pro</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week4 ? 'dark' : 'light']}>
            <StorageIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week4 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 4
            </Typography>
            <Typography>Databases & APIs</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant='body2' color='textSecondary'>
            Coding SOMETHING
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week5 ? 'dark' : 'light']}>
            <DevicesIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week5 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 5
            </Typography>
            <Typography>You built your first React app!</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week6 ? 'dark' : 'light']}>
            <BuildIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week6 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 6
            </Typography>
            <Typography>You mastered React !</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week7 ? 'dark' : 'light']}>
            <LockIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week7 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 7
            </Typography>
            <Typography>Authentication</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant='body2' color='textSecondary'>
            Coding SOMETHING
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week8 ? 'dark' : 'light']}>
            <AccountTreeIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week8 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 8
            </Typography>
            <Typography>You're halfway- well done!</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant='body2' color='textSecondary'>
            Coding SOMETHING
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week9 ? 'dark' : 'light']}>
            <DeveloperBoardIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week9 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 9
            </Typography>
            <Typography>You learnt UseReducer & custom hooks</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week10 ? 'dark' : 'light']}>
            <RouterIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week10 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 10
            </Typography>
            <Typography>You're a AWS amateur</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week11 ? 'dark' : 'light']}>
            <GroupIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week11 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 11
            </Typography>
            <Typography>Working in AGILE</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week12 ? 'dark' : 'light']}>
            <EmojiEmotionsIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week12 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 12
            </Typography>
            <Typography>You're a coding SOMETHING</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant='body2' color='textSecondary'>
            Coding SOMETHING
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot style={dotSwitch[week16 ? 'dark' : 'light']}>
            <NewReleasesIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper
            elevation={3}
            className={classes.paper}
            style={themeSwitch[week16 ? 'dark' : 'light']}
          >
            <Typography variant='h6' component='h1'>
              Week 16
            </Typography>
            <Typography>You're a full stack developer</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
