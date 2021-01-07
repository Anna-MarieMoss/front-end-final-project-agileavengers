import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from '../Input/DateInput/index.js';
import H1 from '../DisplayText/H1Text';
import H2 from '../DisplayText/H2Text';
import SubmitButton from '../Buttons/SubmitButton/index';
import { useAppContext } from '../../AppContext';
import { useHistory } from 'react-router';
//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
function Profile() {
  //Auth0
  const { user, isAuthenticated, isLoading, accessToken , userData} = useAppContext();

  // History from React Router
  const history = useHistory();
 
  // Material UI
  const classes = useStyles();
  
  // Our States
  const [name, setName] = useState(null);
  const [myersBriggs, setMyersBriggs] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [submit, setSubmit] = useState(null);

  // const [registered, setRegistered] = useState(true);


//   useEffect(() => {
//   if (logInCount < 2){
//     setRegistered(false);
//   }}, [user]
//   )
// console.log('profile page', logInCount)
  useEffect(() => {
    if (user?.given_name) {
      setName(user.given_name);
    } else return;
  }, [user]);

  function handleSubmit() {
    setSubmit(true);
    // once submted redirect to Journal View Page
  }
  // Creating User in OUR DB
  useEffect(() => {
    if (submit) {
      async function createProfile() {
        const res = await fetch(`${BACKEND_URL}/users`, {
          method: 'POST',
          headers: {
            'content-type': 'application/JSON',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: name,
            email: user.email,
            password: 'password',
            personality: myersBriggs,
            start_date: selectedDate,
            points: 0,
          }),
        });
        const data = await res.json();
        console.log(data);
      }
      createProfile();
      setSubmit(null);
      history.push('/emotions');
    }
  }, [submit]);

  return (
    <div>
      <H1 text={'Profile'} />
      <img className='profile-pic' src={user?.picture} alt={user?.name} />
      <form className={classes.root} noValidate autoComplete='off'>

      {user?.given_name ? (
        <H2
          text={`Hi ${user?.given_name}, Welcome to your Profile Page, please add your Myers-Briggs and Start Date`}
        />
      ) : (
        <H2
          text={`Hi, Welcome to your Profile Page, please add your Myers-Briggs and Start Date`}
        />
      )}
      
        <div>
        {!user?.given_name && (
            <TextField
              id='outlined-search'
              label='Name'
              type='text'
              variant='outlined'
              onChange={(event) => {
                const { value } = event.target;
                setName(value);
              }}
            />
        )}

          <TextField
            id='outlined-search'
            label='Myers-Briggs'
            type='text'
            variant='outlined'
            onChange={(event) => {
              const { value } = event.target;
              setMyersBriggs(value);
            }}
          />
          <DatePicker values={selectedDate} handleDate={setSelectedDate} />
          {selectedDate && <SubmitButton handleClick={handleSubmit} />}
        </div>
      </form>
    </div>

    
  );
}
export default Profile;

// name and email for profile login
/* <TextField
id='outlined-search'
label='Name'
type='text'
variant='outlined'
onChange={(event) => {
  const { value } = event.target;
  setName(value);
}}
/>
<TextField
id='outlined-search'
label='Email'
type='email'
variant='outlined'
onChange={(event) => {
  const { value } = event.target;
  setEmail(value);
}}
/> */ 