import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import IconButton from '@material-ui/core/IconButton';

import { useAppContext } from '../../AppContext';

import pic from './logo.png';

import './NavTop.css';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  //   width: '100%',
  //   margin: '0px',
  //   background: 'linear-gradient(90deg, #f7797d, #FBD786, #C6FFDD)',
  // },
  title: {
    flexGrow: 1,
    alignContent: 'center',
  },
}));

export default function NavTop() {
  const { isAuthenticated } = useAppContext();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='fixed' >
        <Toolbar>
        <img src={pic} alt={'reflect log'}  style={{position: 'relative', width: '4rem', padding: 0}}/>
          <Typography variant='h6' className={classes.title}>
            Reflect
          </Typography>
          {isAuthenticated && (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              component={Link}
              to='/editprofile'
            >
              {<FaceRoundedIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
