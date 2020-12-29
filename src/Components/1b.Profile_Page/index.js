import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from '../Input/DateInput/index.js';
import H1 from '../DisplayText/H1Text';
import SubmitButton from "../Buttons/SubmitButton/index";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [myersBriggs, setMyersBriggs] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [submit, setSubmit] = useState(null)
  console.log(name);
  console.log(selectedDate)

  function handleSubmit(){
    setSubmit(true);
    console.log('submit hit')
  }
  useEffect(() => {
   if (submit){
     console.log(submit)
    async function postprofile() {
      const res = await fetch(
        // neeed to actual API address
        `http://localhost:3000/users`,
        {
          method: "POST",
          headers: { "content-type": "application/JSON"},
          body: JSON.stringify({
            name: name, 
            email: email,
            password: "password",
            personality: myersBriggs,
            start_date: selectedDate,
            points: 0,
          })
        })
      const data = await res.json();
      console.log(data);
      //hopefully returned a unique post numb
    }
    postprofile();
    setSubmit(null);
  }}, [submit]);

  return (
    <div>
      <H1 text={"Profile"}></H1>
      <p>(Add profile img from Auth0 here)</p>
      <p>(Upload photo link here)</p>
      <form className={classes.root} noValidate autoComplete="off">
    <div>
    <TextField id="outlined-search" label="Name" type="text" variant="outlined" onChange={event => {
          const { value } = event.target;
          setName(value);
        }}/>
    <TextField id="outlined-search" label="Email" type="email" variant="outlined" onChange={event => {
          const { value } = event.target;
          setEmail(value);
        }}/>
    <TextField id="outlined-search" label="Myers-Briggs" type="text" variant="outlined" onChange={event => {
          const { value } = event.target;
          setMyersBriggs(value);
        }}/>
    <DatePicker values={selectedDate} handleDate={setSelectedDate} />
    <SubmitButton handleClick={handleSubmit}/>
      </div>
    </form>
    </div>
  );
}

export default Profile;
