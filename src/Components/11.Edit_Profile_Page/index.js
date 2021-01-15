import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
//import { makeStyles } from '@material-ui/core/styles';
import DatePicker from '../Input/DateInput/index.js';
import H1 from '../DisplayText/H1Text';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useAppContext } from '../../AppContext';
import { useHistory } from 'react-router';
import { ThemeContext } from '../../ThemeContext';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';
import './EditProfile.css';
import { Button } from '@material-ui/core';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function EditProfile() {
  //Dark / Light Theme
  const theme = useContext(ThemeContext);
  //Auth0
  const {
    userData,
    user,
    isAuthenticated,
    accessToken,
    setSubmit,
  } = useAppContext();

  // History from React Router
  const history = useHistory();

  if (!isAuthenticated) {
    history.push('/');
  }

  // Material UI
  //const classes = useStyles();
  // Our States
  const [name, setName] = useState(userData?.name);
  const [myersBriggs, setMyersBriggs] = useState(userData?.personality);
  const [selectedDate, setSelectedDate] = useState(userData?.start_date);

  //Edit Profile Patch - needs work Jeremy
  function handleSubmit() {
    console.log('running');
    async function editProfile() {
      const res = await fetch(`${BACKEND_URL}/users/${userData?.id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/JSON',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: name,
          personality: myersBriggs,
          start_date: selectedDate,
        }),
      });
      const data = await res.json();
      console.log(data);
      setSubmit(true);
      toast(`Profile page updated!`, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(function () {
        history.push('/journalview');
      }, 2000);
    }
    editProfile();
  }

  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

  return (
    isAuthenticated && (
      <div>
        <NavTop />
        <ToastContainer
          transition={Slide} // changes the transition to a slide rather than a bounce.  Alerts are rendering multiple times at the moment due to the page re redering all of the buttons.  Look into how you can stop this happening but keeep the cool styling tomorrow.
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div id={theme}>
          <H1 text={'Edit Profile'} />
          <div className={'container'}>
            <div className='profile-div'>
              <img
                className='profile-pic'
                src={user?.picture}
                alt={user?.name}
              />
            </div>
            <form /*className={classes.root}*/ noValidate autoComplete='off'>
              <div id={theme} className={'profile'}>
                <TextField
                  id='outlined-search'
                  label={`Name: ${name}`}
                  type='text'
                  variant='outlined'
                  color={muiTheme(theme)}
                  onChange={(event) => {
                    const { value } = event.target;
                    setName(value);
                  }}
                />
                <br></br>
                <br></br>
                <TextField
                  id='outlined-search'
                  label={`Myers-Briggs: ${myersBriggs}`}
                  type='text'
                  variant='outlined'
                  color={muiTheme(theme)}
                  onChange={(event) => {
                    const { value } = event.target;
                    setMyersBriggs(value);
                  }}
                />
                <br></br>
                <br></br>
                <DatePicker
                  values={selectedDate}
                  handleDate={setSelectedDate}
                  label='Bootcamp Start Date'
                />
                <br></br>
                <Button
                  className='btn'
                  onClick={() => handleSubmit()}
                  variant='outlined'
                  color={muiTheme(theme)}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
        <NavBar />
      </div>
    )
  );
}
export default EditProfile;
