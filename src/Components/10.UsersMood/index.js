import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../AppContext';
import Chartjs from 'chart.js';
import H1 from '../DisplayText/H1Text/index';
import 'date-fns';
import DatePicker from '../Input/DateInput/index.js';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';
import { useHistory } from 'react-router';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function UsersMood() {
  const { isAuthenticated, accessToken } = useAppContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [usersMoodResponse, setUsersMoodResponse] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [graphData, setGraphData] = useState([]);
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
        // console.log( `data is  ${JSON.stringify(data)}`);
        console.log(`data payload is `, data.payload);
        // console.log(`data is ${JSON.stringify(data.payload[0].mood)}`)
        setUsersMoodResponse(data.payload);
        //chartConfig.data.datasets[0].data = graphData.map((x) => x.mood);
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
    } else return `Bootcampers Moods On ${date}`;
  }

  return (
    isAuthenticated && (
      <div className={'users-mood'} style={{paddingBottom: '50px'}}>
        <NavTop />
        <div className='container'>
          <H1 text={headingText()} />

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
          <br></br>
          <canvas
            ref={chartContainer}
            style={{ width: '100em', height: '100em' }}
          />
        </div>
        <NavBar />
      </div>
    )
  );
}

export default UsersMood;
