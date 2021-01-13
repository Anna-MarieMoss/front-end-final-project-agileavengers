import React, { useEffect, useRef, useState, useContext } from 'react';
import { useAppContext } from '../../AppContext';
import { ThemeContext } from '../../ThemeContext';
import H2 from '../DisplayText/H2Text/index';
import Graph from '../Graphs/index';
import './Stats.css';
import { Typography , Button} from '@material-ui/core';
import UsersMoods from '../Graphs/pieChart.js';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



function Stats() {
  const { isAuthenticated, isLoading, userData, accessToken } = useAppContext();
  const name = userData ? userData?.name : '';
  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }
  // const [myData, setMyData] = useState(false);

  let userId = userData.id

  const [viewRecentData, setViewRecentData] = useState(true);
  const [myMoodResponse, setMyMoodResponse] = useState([{ mood: 1 , date: '2021-01-01'},
  { mood: 3 , date: '2021-01-02', user_id: 1},
  { mood: 5 , date: '2021-01-03', user_id: 2},
  { mood: 5 , date: '2021-01-04', user_id: 2},
  { mood: 5 , date: '2021-01-05', user_id: 3},
  { mood: 1 , date: '2021-01-06', user_id: 2},
  { mood: 5 , date: '2021-01-07', user_id: 2},
  { mood: 3 , date: '2021-01-08', user_id: 5},
  { mood: 1 , date: '2021-01-06', user_id: 2},
  { mood: 5 , date: '2021-01-07', user_id: 2},
  { mood: 3 , date: '2021-01-08', user_id: 5},]);
  const [pieGraphData, setPieGraphData] = useState([]);
  const [myData, setMyData] = useState(true);
 
  const theme = useContext(ThemeContext);
  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

  function toggleMyData(){
    if(!viewRecentData){
      let res = myMoodResponse.filter(num => {
                  if (num.mood !== null){
                    return true
                  }
                  return false;
                })
      let graphRes = res.reduce((acc, cur) => {
                    if (acc[cur]){
                        return {...acc, [cur]: acc[cur] + 1}
                      }
                      return {...acc, [cur]: 1}
                } ,{1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
                setPieGraphData(graphRes);
    }
    setViewRecentData(!viewRecentData);
  }

   // toggle user vs all userSelect: 
   function toggleUsers() {
    setPieGraphData([]);
    setMyData(!myData);
    console.log('user data has changed');
  }

// ///my Data
// useEffect(() => {
//   if (myMoodResponse) {
//     function getAllMyMoodData() {
//       let res = myMoodResponse.reduce((acc, cur) => {
//           if(cur.user_id === userId){
//               return [...acc, cur.mood]
//           }
//           return acc;
//       }, [])
//       console.log('this is res:', res )
//       res = res.filter(num => {
//         if (num !== null){
//           return true
//         }
//         return false;
//       })
//       console.log('this is res:', res )
//       let graphRes = res.reduce((acc, cur) => {
//           if (acc[cur]){
//               return {...acc, [cur]: acc[cur] + 1}
//             }
//             return {...acc, [cur]: 1}
//       } ,{1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
    
//       setGraphData(Object.values(graphRes))
//       }
//       getAllMyMoodData();
// }
// }, [myData, viewRecentData])

// Getting Data
useEffect(() => {
  async function getMood() {
    const res = await fetch(`${BACKEND_URL}/posts/${userId}`, {
      headers: {
        'content-type': 'application/JSON',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    for (let post of data.payload) {
      post.date = new Date(post.date).toDateString().slice(4);
    }
    console.log(`data payload is `, data.payload);
    // console.log(`data is ${JSON.stringify(data.payload[0].mood)}`)
    setMyMoodResponse(data.payload);

    //chartConfig.data.datasets[0].data = graphData.map((x) => x.mood);
  }

  getMood();
}, [viewRecentData , userData]);


  return (
    <div className={'stats'}>
      <div className='container'>
        <H2 text={`Your Stats`} />
        <Typography variant='h6'>
          Display your mood throughout the bootcamp
        </Typography>
        <Button onClick={toggleMyData}
        className='btn'
        variant='outlined'
        color={muiTheme(theme)}>{viewRecentData ? 'Show Bootcampers Moods' : 'Show My Recent Moods'}</Button>
        <br></br>
        { viewRecentData && (<Graph />)}
        <Button onClick={toggleUsers}
        className='btn'
        variant='outlined'
        color={muiTheme(theme)}>{myData ? 'Show Bootcampers Moods By Date' : 'Show All My Moods'}</Button>
        {/* { !myData && (<MuiPickersUtilsProvider utils={DateFnsUtils} color={muiTheme(theme)}>
          <Grid container justify='space-around' color={muiTheme(theme)}>
            <KeyboardDatePicker
              autoOk={true}
              disableToolbar
              variant='inline'
              format='yyyy-mm-dd'
              margin='normal'
              value={selectedDate}
              onChange={handleDate}
              color={muiTheme(theme)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>)} */}
      
      <br></br>
      { !viewRecentData && (<UsersMoods graphData={pieGraphData}/>)}
      </div>
    </div>
  );
}

export default Stats;
