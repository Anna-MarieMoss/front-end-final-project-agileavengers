import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../AppContext';
import Chartjs from 'chart.js';
import H1 from '../DisplayText/H1Text/index';
import 'date-fns';
import DatePicker from '../Input/DateInput/index.js';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';
import { useHistory } from 'react-router';
import { Typography } from '@material-ui/core';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function UsersMood() {
  const {
    isAuthenticated,
    accessToken,
    userData,
    emotionsArray,
  } = useAppContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [usersMoodResponse, setUsersMoodResponse] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [yourMood, setyourMood] = useState(null);
  const chartContainer = useRef(null);
  const history = useHistory();

  if (!isAuthenticated) {
    history.push('/');
  }

  let chartConfig = {
    type: 'pie',
    data: {
      labels: ['😢', '😒', '😬', '😀', '😍'],
      datasets: [
        {
          data: graphData,
          backgroundColor: [
            '#F7797D',
            '#7C77B9',
            '#89DAFF',
            '#FBD786',
            '#C6FFDD',
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
        text: `Bootcampers mood on the: ${selectedDate}`,
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

  function handleDate(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    setSelectedDate(year + '-' + month + '-' + day);
  }

  /// need to figure out how to get an array of numbers that correspond with mood
  // maybe try useReducer and use a switch statement
  useEffect(() => {
    if (usersMoodResponse) {
      function getUsersMoodByDate() {
        let res = usersMoodResponse.reduce((acc, cur) => {
          if (cur.date.slice(0, 10) === selectedDate) {
            return [...acc, cur.mood];
          }
          return acc;
        }, []);
        let res2 = res.filter((x) => x !== null);
        let graphRes = res2.reduce(
          (acc, cur) => {
            if (acc[cur]) {
              return { ...acc, [cur]: acc[cur] + 1 };
            }
            return { ...acc, [cur]: 1 };
          },
          { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        );

        setGraphData(Object.values(graphRes));
      }
      getUsersMoodByDate();
    }
  }, [selectedDate, usersMoodResponse]);

  // to get the users mood on a specific date

  useEffect(() => {
    if (usersMoodResponse) {
      function getUsersMoodById() {
        let res1 = usersMoodResponse.filter(
          (data) => data?.user_id === userData?.id
        );
        let res = res1.reduce((acc, cur) => {
          if (cur.date.slice(0, 10) === selectedDate) {
            return [...acc, cur.mood];
          }
          return acc;
        }, []);
        let res2 = res.map((x) => {
          if (x !== null) {
            return emotionsArray[x - 1].emotion;
          }
        });
        if (res2.length === 0) {
          setyourMood(null);
        } else {
          setyourMood(res2[0]);
        }
      }
      getUsersMoodById();
    }
  }, [selectedDate, usersMoodResponse]);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, graphData]);

  useEffect(() => {
    if (selectedDate) {
      async function getUsersMood() {
        const res = await fetch(`${BACKEND_URL}/posts/`, {
          headers: {
            'content-type': 'application/JSON',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        setUsersMoodResponse(data.payload);
      }

      getUsersMood();
    }
  }, [selectedDate]);

  //date format
  function getLongDate() {
    let newDate = new Date(selectedDate);
    newDate = newDate.toString();
    return newDate.slice(0, 15);
  }
  let date = getLongDate();

  //select date
  function headingText() {
    if (selectedDate === null) {
      return 'General Bootcampers Moods';
    } else return `Bootcampers Moods For ${date}`;
  }

  return (
    isAuthenticated && (
      <div className={'users-mood'} style={{ paddingBottom: '50px' }}>
        <NavTop />
        <div>
          <H1 text={headingText()} />
         
          <div className='container'>
            <Typography variant='h6'>
              See how your fellow bootcampers rated their moods for a selected
              day. Did you have a similar day to others?
            </Typography>
            <DatePicker
              values={selectedDate}
              handleDate={handleDate}
              label='Select a Date'
            />
             <div className='pie-legend'>
          <button
            style={{
              backgroundColor: '#F7797D',
              width: '3em',
              borderRadius: '30px',
              border: 0,
              fontSize: '1.5em',
              margin: '0.3em',
              outline: 'none',
            }}
          >
            😢
          </button>
          <button
            style={{
              backgroundColor: '#7C77B9',
              width: '3em',
              borderRadius: '30px',
              border: 0,
              fontSize: '1.5em',
              margin: '0.3em',
              outline: 'none',
            }}
          >
            😒
          </button>
          <button
            style={{
              backgroundColor: '#89DAFF',
              width: '3em',
              borderRadius: '30px',
              border: 0,
              fontSize: '1.5em',
              margin: '0.3em',
              outline: 'none',
            }}
          >
            😬
          </button>
          <button
            style={{
              backgroundColor: '#FBD786',
              width: '3em',
              borderRadius: '30px',
              border: 0,
              fontSize: '1.5em',
              margin: '0.3em',
              outline: 'none',
            }}
          >
            😀
          </button>
          <button
            style={{
              backgroundColor: '#C6FFDD',
              width: '3em',
              borderRadius: '30px',
              border: 0,
              fontSize: '1.5em',
              margin: '0.3em',
              outline: 'none',
            }}
          >
            😍
          </button>
        </div>
          </div>
              {selectedDate && (
            <Typography variant='h6'>
              {yourMood
                ? `Your mood on this date: ${yourMood}`
                : `You didn't enter a mood for this date`}
            </Typography>
          )}
          <br></br>
          <div style={{padding: '1em'}}>
          <canvas
            ref={chartContainer}
            style={{ width: '100em', height: '100em' }}
          />
          </div>
        </div>
        <NavBar />
      </div>
    )
  );
}

export default UsersMood;
