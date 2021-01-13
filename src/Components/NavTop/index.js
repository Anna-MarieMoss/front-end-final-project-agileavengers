import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import IconButton from '@material-ui/core/IconButton';
import pic from './SoC_Logo.png';

import './NavTop.css';

const useStyles = makeStyles((theme) => ({
    // root: {
    //   flexGrow: 1,
    //   width: '100%',
    // margin: '0px',
    // background: 'linear-gradient(90deg, #f7797d, #FBD786, #C6FFDD)',
    // },
    title: {
      flexGrow: 1,
    },
  }));

export default function NavTop(){
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar >
          <div  >
          <img src={pic} alt="Soc Logo" id='navbarlogo' style={{width: '0.5em', height: 'auto', position: 'fixed'}}/> </div>
            <Typography variant="h6" className={classes.title}>
              Reflect
            </Typography>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" component={Link}
                to='/editprofile'>
                {<FaceRoundedIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }