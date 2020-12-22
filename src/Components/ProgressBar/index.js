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
import { progressPosition } from './progressFunction';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function ProgressBar() {
  const classes = useStyles();

  const currentWeek = progressPosition('Dec 21 2020'); //function imported, given start date. Function set up for 18 weeks.
  console.log(currentWeek);

  return (
    <Timeline align='alternate'>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant='body2' color='textSecondary'>
            Coding Newbie
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <GitHubIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
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
          <TimelineDot color='primary'>
            <FunctionsIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='h6' component='h1'>
              Week 2
            </Typography>
            <Typography>You mastered advance Javascript</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='primary' variant='outlined'>
            <CodeIcon />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='h6' component='h1'>
              Week 3
            </Typography>
            <Typography>You're a Node & Express pro</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='secondary'>
            <StorageIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
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
          <TimelineDot>
            <DevicesIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='h6' component='h1'>
              Week 5
            </Typography>
            <Typography>You built your first React app!</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='primary'>
            <BuildIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='h6' component='h1'>
              Week 6
            </Typography>
            <Typography>You mastered React !</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='primary' variant='outlined'>
            <LockIcon />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
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
          <TimelineDot color='secondary'>
            <AccountTreeIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
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
          <TimelineDot>
            <DeveloperBoardIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='h6' component='h1'>
              Week 9
            </Typography>
            <Typography>You learnt UseReducer & custom hooks</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='primary'>
            <RouterIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='h6' component='h1'>
              Week 10
            </Typography>
            <Typography>You're a AWS amateur</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='primary' variant='outlined'>
            <GroupIcon />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='h6' component='h1'>
              Week 11
            </Typography>
            <Typography>Working in AGILE</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='secondary'>
            <EmojiEmotionsIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
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
            Coding Newbie
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <NewReleasesIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
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
