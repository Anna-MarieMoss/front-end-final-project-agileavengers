import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from '../Input/DateInput/index.js';
import H1 from '../DisplayText/H1Text';
import H2 from '../DisplayText/H2Text';
import SubmitButton from '../Buttons/SubmitButton/index';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Profile() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [myersBriggs, setMyersBriggs] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [submit, setSubmit] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(user.name);
  console.log(user.email);
  console.log(user.picture);

  function handleSubmit() {
    setSubmit(true);
    console.log('submit hit');
  }

  useEffect(() => {
    if (submit) {
      console.log(submit);
      async function postprofile() {
        const res = await fetch(
          // neeed to actual API address
          `http://localhost:3000/users`,
          {
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
          }
        );
        const data = await res.json();
        console.log(data);
      }
      postprofile();
      setSubmit(null);
    }
  }, [submit]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <H1 text={'Profile'}></H1>
        <img className="profile-pic" src={user.picture} alt={user.name} />
        <H2 text={`Hi ${user.name}, Welcome to your Profile Page, please add your Myers-Briggs and Start Date`} />
        <form className={classes.root} noValidate autoComplete='off'>
          <div>
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
      </div>
    )
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