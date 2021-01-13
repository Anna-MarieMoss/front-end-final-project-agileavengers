import React, { useState, useEffect, useRef, useContext } from 'react';
import { useAppContext } from '../../AppContext';
import Chartjs from 'chart.js';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { Button } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ThemeContext } from '../../ThemeContext';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function UsersMood(graphData) {
//   const { isAuthenticated, isLoading, accessToken, userData, user } = useAppContext();
//   const [selectedDate, setSelectedDate] = useState('');
  // const [usersMoodResponse, setUsersMoodResponse] = useState([{ mood: 1 , date: '2021-01-01'},
  // { mood: 3 , date: '2021-01-02', user_id: 1},
  // { mood: 5 , date: '2021-01-03', user_id: 2},
  // { mood: 5 , date: '2021-01-04', user_id: 2},
  // { mood: 5 , date: '2021-01-05', user_id: 3},
  // { mood: 1 , date: '2021-01-06', user_id: 2},
  // { mood: 5 , date: '2021-01-07', user_id: 2},
  // { mood: 3 , date: '2021-01-08', user_id: 5},
  // { mood: 1 , date: '2021-01-06', user_id: 2},
  // { mood: 5 , date: '2021-01-07', user_id: 2},
  // { mood: 3 , date: '2021-01-08', user_id: 5},]);
  const [chartInstance, setChartInstance] = useState(null);
  // const [graphData, setGraphData] = useState([]);
  const chartContainer = useRef(null);
  // const [myData, setMyData] = useState(true);
 
//   // more state 
//   let userId = 2;

  //set Mui Dark Theme
  const theme = useContext(ThemeContext);
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

  let chartConfig = {
    type: 'pie',
    data: {
      labels: ['😢', '😒', '😬', '😀', '😍'],
      datasets: [
        {
          data: graphData,
          backgroundColor: [
            'rgba(106, 76, 147, 1)',
            'rgba(25, 130, 196, 1)',
            'rgba(138, 201, 38, 1)',
            'rgba(255, 202, 58, 1)',
            'rgba(255, 89, 94, 1)',
          ],
        },
      ],
    },
    options: {
      legend: {
        display: false,
        labels: {
          fontSize: 20,
          padding: 10,
        },
      },
      title: {
        display: false,
        text: `Bootcampers mood`,
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: '2em',
          bottom: '2em',
        },
      },
    },
  };

  // function handleDate(date) {
  //   console.log('date is', date);
  //   console.log('im working');
  //   var year = date.getFullYear().toString();
  //   var month = (date.getMonth() + 101).toString().substring(1);
  //   var day = (date.getDate() + 100).toString().substring(1);
  //   setSelectedDate(year + '-' + month + '-' + day);
  // }

  //Bootcampers Data By Date
//   useEffect(() => {
//     if (usersMoodResponse) {
//       function getUsersMoodByDate() {
//         let res = usersMoodResponse.reduce((acc, cur) => {
//             if(cur.date.slice(0,10) === selectedDate){
//                 return [...acc, cur.mood]
//             }
//             return acc;
//         }, [])
//         console.log('this is res:', res )
//         res = res.filter(num => {
//           if (num !== null){
//             return true
//           }
//           return false;
//         })
//         console.log('this is res:', res )
//         let graphRes = res.reduce((acc, cur) => {
//             if (acc[cur]){
//                 return {...acc, [cur]: acc[cur] + 1}
//               }
//               return {...acc, [cur]: 1}
//         } ,{1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
      
//         setGraphData(Object.values(graphRes))
//         }
//         getUsersMoodByDate();
// }
// }, [selectedDate])

//  ///my Data
//   useEffect(() => {
//     if (usersMoodResponse) {
//       function getAllMyMoodData() {
//         let res = usersMoodResponse.reduce((acc, cur) => {
//             if(cur.user_id === userId){
//                 return [...acc, cur.mood]
//             }
//             return acc;
//         }, [])
//         console.log('this is res:', res )
//         res = res.filter(num => {
//           if (num !== null){
//             return true
//           }
//           return false;
//         })
//         console.log('this is res:', res )
//         let graphRes = res.reduce((acc, cur) => {
//             if (acc[cur]){
//                 return {...acc, [cur]: acc[cur] + 1}
//               }
//               return {...acc, [cur]: 1}
//         } ,{1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
      
//         setGraphData(Object.values(graphRes))
//         }
//         getAllMyMoodData();
// }
// }, [myData])

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, []);
//   chartContainer, graphData

//   useEffect(() => {
//     if (selectedDate) {
//       async function getUsersMood() {
//         const res = await fetch(`${BACKEND_URL}/posts/`, {
//           headers: {
//             'content-type': 'application/JSON',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         const data = await res.json();
//         // console.log( `data is  ${JSON.stringify(data)}`);
//         console.log(`data payload is `, data.payload);
//         // console.log(`data is ${JSON.stringify(data.payload[0].mood)}`)
//         setUsersMoodResponse(data.payload);
//         console.log(`graphData state is`, usersMoodResponse);
//         //chartConfig.data.datasets[0].data = graphData.map((x) => x.mood);
//       }

//       getUsersMood();
//     }
//   }, [selectedDate, myData]);


//   // toggle user vs all userSelect: 
//   function toggleUsers() {
//     setGraphData([]);
//     setMyData(!myData);
//     console.log('user data has changed');
//   }
  
  return (
    <div className={'users-mood'}>
           {/* <Button onClick={toggleUsers}
        className='btn'
        variant='outlined'
        color={muiTheme(theme)}>{myData ? 'Show Bootcampers Moods By Date' : 'Show All My Moods'}</Button>
        { !myData && (<MuiPickersUtilsProvider utils={DateFnsUtils} color={muiTheme(theme)}>
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
        <div className='pie-legend'>
          <button
            style={{
              backgroundColor: 'rgba(106, 76, 147, 1)',
              width: '3em',
              borderRadius: '30px',
              border: 0,
              fontSize: '1.5em',
              margin: '0.3em',
            }}
          >
            😢
          </button>
          <button
            style={{
              backgroundColor: 'rgba(25, 130, 196, 1)',
              width: '3em',
              borderRadius: '30px',
              border: 0,
              fontSize: '1.5em',
              margin: '0.3em',
            }}
          >
            😒
          </button>
          <button
            style={{
              backgroundColor: 'rgba(138, 201, 38, 1)',
              width: '3em',
              borderRadius: '30px',
              border: 0,
              fontSize: '1.5em',
              margin: '0.3em',
            }}
          >
            😬
          </button>
          <button
            style={{
              backgroundColor: 'rgba(255, 202, 58, 1)',
              width: '3em',
              borderRadius: '30px',
              border: 0,
              fontSize: '1.5em',
              margin: '0.3em',
            }}
          >
            😀
          </button>
          <button
            style={{
              backgroundColor: 'rgba(255, 89, 94, 1)',
              width: '3em',
              borderRadius: '30px',
              border: 0,
              fontSize: '1.5em',
              margin: '0.3em',
            }}
          >
            😍
          </button>
        </div>
        <br></br>
        <canvas
          ref={chartContainer}
          style={{ width: '100em', height: '100em' }}
        />
    </div>
  );

  }
export default UsersMood;
