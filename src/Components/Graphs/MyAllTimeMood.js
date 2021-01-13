import React, { useState, useEffect, useRef, useContext } from 'react';
import { useAppContext } from '../../AppContext';
import Chartjs from 'chart.js';
import H1 from '../DisplayText/H1Text/index';
import 'date-fns';
import { ThemeContext } from '../../ThemeContext';
import DatePicker from '../Input/DateInput/index.js';
import NavBar from '../NavBar/NavBar';
import NavTop from '../NavTop/index.js';
import { useHistory } from 'react-router';
import { parseWithOptions } from 'date-fns/fp';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function MyAllTimeMood({ pieGraphData }) {
  const {
    isAuthenticated,
    isLoading,
    accessToken,
    userData,
    user,
  } = useAppContext();
  //const [selectedDate, setSelectedDate] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const chartContainer = useRef(null);
  // if (!isAuthenticated) {
  //   history.push('/');
  // }

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

  /// need to figure out how to get an array of numbers that correspond with mood
  // maybe try useReducer and use a switch statement
  useEffect(() => {
    if (pieGraphData) {
      function getUsersMoodByDate() {
        let res = pieGraphData
          .filter((x) => x.mood !== null)
          .map((x) => x.mood);
        console.log(
          '🚀 ~ file: MyAllTimeMood.js ~ line 83 ~ getUsersMoodByDate ~ res',
          res
        );

        let graphRes = res.reduce(
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
  }, [pieGraphData]);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, graphData]);

  return (
    isAuthenticated && (
      <div className={'users-mood'}>
        <br></br>

        <div className='pie-legend'>
          <button
            style={{
              backgroundColor: 'rgba(106, 76, 147, 1)',
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
              backgroundColor: 'rgba(25, 130, 196, 1)',
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
              backgroundColor: 'rgba(138, 201, 38, 1)',
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
              backgroundColor: 'rgba(255, 202, 58, 1)',
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
              backgroundColor: 'rgba(255, 89, 94, 1)',
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
    )
  );
}

export default MyAllTimeMood;
