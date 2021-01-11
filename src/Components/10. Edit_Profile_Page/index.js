import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
//import { makeStyles } from '@material-ui/core/styles';
import DatePicker from '../Input/DateInput/index.js';
import H1 from '../DisplayText/H1Text';
import H2 from '../DisplayText/H2Text';
import SubmitButton from '../Buttons/SubmitButton/index';
import { useAppContext } from '../../AppContext';
import { useHistory } from 'react-router';
import '../1b.Profile_Page/Profile.css';
import { ThemeContext } from '../../ThemeContext';
//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));
function EditProfile() {
  const theme = useContext(ThemeContext);
  //Auth0
  const {
    user,
    isAuthenticated,
    isLoading,
    accessToken,
    userData,
  } = useAppContext();

  // History from React Router
  const history = useHistory();

  console.log(userData);

  // Material UI
  //const classes = useStyles();
  // Our States
  const [userObject, setUserObject] = useState(userData);
  const [submit, setSubmit] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function changeUserObject(value, id) {
    setUserObject({ ...userObject, [id]: value });
  }
  // Patching UserObject in OUR DB

  async function patchProfile() {
    const res = await fetch(`${BACKEND_URL}/users/${userData.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/JSON',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: userObject.name,
        email: userObject.email,
        personality: userObject.personality,
        start_date: userObject.personality,
      }),
    });
    const data = await res.json();
    console.log(data);
    setSubmit(null);
    //history.push('/emotions');
  }

  console.log('userObject', userObject);

  return (
    <div id={theme} className={'profile'}>
      <H1 text={'Edit Profile'} />
      <img
        className='profile-pic'
        src={userObject?.picture}
        alt={userObject?.name}
      />
      <H2
        text={`Hi ${userObject.name}, edit your profile info and press save changes!`}
      />
      <br />
      <form /*className={classes.root}*/ noValidate autoComplete='off'>
        <div id={theme} className={'profile'}>
          {!userObject?.given_name && (
            <TextField
              id='name'
              label='Name'
              type='text'
              variant='outlined'
              onChange={(event) => {
                const { value, id } = event.target;
                changeUserObject(value, id);
              }}
            />
          )}
          <br />
          <br />
          <TextField
            id='email'
            label='email'
            type='text'
            variant='outlined'
            onChange={(event) => {
              const { value, id } = event.target;
              changeUserObject(value, id);
            }}
          />
          <br />
          <br />
          <TextField
            id='personality'
            label='Personality'
            type='text'
            variant='outlined'
            onChange={(event) => {
              const { value, id } = event.target;
              changeUserObject(value, id);
            }}
          />
          <DatePicker
            id='start_date'
            //values={userData?.start_date}
            //value={selectedDate}
            handleDate={(event) => {
              console.log('event is', event.toDateString());
              //changeUserObject(event, id);
            }}
            // onChange={
          />
          <SubmitButton handleClick={patchProfile} />
        </div>
      </form>
    </div>
  );
}
export default EditProfile;
