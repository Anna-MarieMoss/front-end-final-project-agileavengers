import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import IconButton from '@material-ui/core/IconButton';
import { useAppContext } from '../../AppContext';
import pic from './reflect.png';
import './NavTop.css';

const useStyles = makeStyles((theme) => ({

  title: {
    flexGrow: 1,
    alignContent: 'center',
  },
  logo: {
    margin: 0,
  }
}));

export default function NavTop() {
  const { isAuthenticated } = useAppContext();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
        <IconButton className={classes.logo} component={Link}
            to='/journalview'>
          <img
            src={pic}
            alt={'reflect log'}
            style={{ position: 'relative', width: '2rem', padding: 0 }}
          /></IconButton>
          <Typography variant='h6' className={classes.title} id='reflect'>
            reflect
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
