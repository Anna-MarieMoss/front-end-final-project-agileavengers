import React, { useEffect, useRef, useState, useContext } from 'react';
import Chartjs from 'chart.js';
import { Button } from '@material-ui/core';
import { useAppContext } from '../../AppContext';
import { ThemeContext } from '../../ThemeContext';
import UsersMood from '../10.UsersMood';
import MyAllTimeMood from './MyAllTimeMood';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Graph = () => {
  const { isAuthenticated, isLoading, accessToken, userData } = useAppContext();
  const chartContainer = useRef(null);
  const theme = useContext(ThemeContext);
  const [chartInstance, setChartInstance] = useState(null);
  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [pieGraphData, setPieGraphData] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);
  const [showAllTime, setShowAllTime] = useState(false);

  let userId = userData?.id;

  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }
  //set graph Dark Theme
  function graphTheme(theme) {
    if (theme === 'lightTheme') {
      return '#303030';
    } else return '#fafafa';
  }

  function toggleAllTime() {
    setShowAllTime(!showAllTime);
    console.log('showAllTime is:', !showAllTime);
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, graphData, userData, showAllTime]);

  // const updateDataset = (datasetIndex, newData) => {
  //   chartInstance.data.datasets[datasetIndex].data = newData;
  //   chartInstance.update();
  // };

  useEffect(() => {
    async function getMood() {
      const res = await fetch(`${BACKEND_URL}/posts/${userId}`, {
        headers: {
          'content-type': 'application/JSON',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      // console.log( `data is  ${JSON.stringify(data)}`);

      for (let post of data.payload) {
        post.date = new Date(post.date).toDateString().slice(4);
      }

      setPieGraphData(data.payload);
      console.log(`data payload is `, data.payload);
      // console.log(`data is ${JSON.stringify(data.payload[0].mood)}`)
      setGraphData(data.payload.slice(0, 10));
      console.log(`graphData state is`, graphData);
      //chartConfig.data.datasets[0].data = graphData.map((x) => x.mood);
    }

    getMood();
  }, [userData, showAllTime]);

  let chartConfig = {
    type: 'bar',
    data: {
      labels: graphData.map((x) => x.date),
      datasets: [
        {
          label: 'Mood',
          data: graphData.map((x) => x.mood),
          backgroundColor: [
            '#F7797D',
            '#7C77B9',
            '#89DAFF',
            '#FBD786',
            '#C6FFDD',
            '#F7797D',
            '#7C77B9',
            '#89DAFF',
            '#FBD786',
            '#C6FFDD',
          ],
          borderColor: [
            '#F7797D',
            '#7C77B9',
            '#89DAFF',
            '#FBD786',
            '#C6FFDD',
            '#F7797D',
            '#7C77B9',
            '#89DAFF',
            '#FBD786',
            '#C6FFDD',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      labels: {
        fontColor: graphTheme(theme),
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
            },
            ticks: {
              fontSize: 10,
              fontColor: graphTheme(theme),
            },
          },
        ],
        yAxes: [
          {
            fontSize: 20,
            scaleLabel: {
              display: true,
            },
            ticks: {
              min: 0,
              max: 5,
              fontSize: 15,
              fontColor: graphTheme(theme),
              callback: function (value, index, values) {
                if (value === 0) {
                  return '';
                }
                if (value === 1) {
                  return '😢';
                }
                if (value === 2) {
                  return '😒';
                }
                if (value === 3) {
                  return '😬';
                }
                if (value === 4) {
                  return '😀';
                }
                if (value === 5) {
                  return '😍';
                }
              },
            },
          },
        ],
      },
    },
  };
  //
  return (
    <div>
      <Button
        onClick={toggleAllTime}
        className='btn'
        variant='outlined'
        color={muiTheme(theme)}
      >
        {showAllTime ? 'Last Ten' : 'All Time'}
      </Button>
      <br></br>
      <br></br>
      <div>
        {!showAllTime && (
          <div>
            <h1>Your Last Ten Moods</h1>
            <canvas
              ref={chartContainer}
              style={{ width: '100em', height: '100em' }}
            />
          </div>
        )}
        {showAllTime && <MyAllTimeMood pieGraphData={pieGraphData} />}
      </div>
    </div>
  );
};

export default Graph;
