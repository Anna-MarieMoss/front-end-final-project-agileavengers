import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from '../Input/DateInput/index.js';
import H1 from '../DisplayText/H1Text';
import H2 from '../DisplayText/H2Text';
import SubmitButton from '../Buttons/SubmitButton/index';
import { useAppContext } from '../../AppContext';

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
const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAppContext();

const [userMetadata, setUserMetadata] = useState(null);

// Material UI
  const classes = useStyles();

// Our States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [myersBriggs, setMyersBriggs] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [submit, setSubmit] = useState(null);
  

  function handleSubmit() {
    setSubmit(true);
    console.log('submit hit');
  }

  // Auth0 Custome Hook - setting Metadata
  useEffect(() => {
    console.log("hello Start")
    const getUserMetadata = async () => {
      const domain = 'dev-ip1x4wr7.eu.auth0.com';
  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        console.log(accessToken);
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, []);

  // Creating User in OUR DB
  useEffect(() => {
    if (submit) {
      console.log(submit);
      async function postprofile() {
        const res = await fetch(`${BACKEND_URL}/users`, {
          method: 'POST',
          headers: { 'content-type': 'application/JSON' },
          body: JSON.stringify({
            name: user.name,
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
      postprofile();
      setSubmit(null);
    }
  }, [submit]);

  

  return (
    
      <div>
        <H1 text={'Profile'} />
        <img className='profile-pic' src={user?.picture} alt={user?.name} />
        <H2
          text={`Hi ${user?.given_name}, Welcome to your Profile Page, please add your Myers-Briggs and Start Date`}
        />
        <form className={classes.root} noValidate autoComplete='off'>
          <div>
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
            <SubmitButton handleClick={handleSubmit} />
          </div>
        </form>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )} 
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
