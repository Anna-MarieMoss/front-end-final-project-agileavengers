import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../AppContext';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import './Dialogbox.css';

export default function PersonalityDisplay({ personality }) {
  const [open, setOpen] = React.useState(false);
  const [myers, setMyers] = useState('');
  const { userData } = useAppContext();
  console.log(userData);

  useEffect(() => {
    if (
      personality.code.toLowerCase() === userData?.personality.toLowerCase()
    ) {
      document.getElementById(personality.code).style.backgroundColor =
        '#FBD786';
    }
  }, [personality, userData?.personality]);

  useEffect(() => {
    if (
      personality.code.toLowerCase() === userData?.personality.toLowerCase()
    ) {
      setMyers(`Your Myers-Briggs: ${personality.code}`);
    } else {
      setMyers(personality.code);
    }
  }, [personality, userData?.personality]);

  // if(mycode?.toLowerCase() === personality.code){
  //     return setPersonalityColor('primary');
  // }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ paddingTop: '1em', paddingRight: '1em', paddingLeft: '1em' }}>
      <Paper id={personality.code} elevation={3} onClick={handleClickOpen}>
        <Typography variant='subtitle1'>{myers}</Typography>
        <Typography variant='subtitle2'>{personality.type}</Typography>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{personality.type}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {personality.work}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
