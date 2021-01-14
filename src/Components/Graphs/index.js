import React, { useEffect, useRef, useState, useContext } from 'react';
import Chartjs from 'chart.js';
import { Button } from '@material-ui/core';
import { useAppContext } from '../../AppContext';
import { ThemeContext } from '../../ThemeContext';
import UsersMood from '../10.UsersMood';
import MyAllTimeMood from './MyAllTimeMood';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Temp userId
//const userId = 1;

const Graph = () => {
  const { isAuthenticated, isLoading, accessToken, userData } = useAppContext();
  const chartContainer = useRef(null);
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

  const theme = useContext(ThemeContext);
  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

  const randomInt = () => Math.floor(Math.random() * (5 - 1 + 1)) + 1;

  // function toggleGeneralMood() {
  //   setShowGeneralMood(!showGeneralMood);
  //   console.log('showGeneralMood is:', !showGeneralMood);
  //   setShowUserAllTimeMood(!showUserAllTime);
  //   console.log('showUserAllTime is:', !showUserAllTime);
  // }

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

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

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

  'rgba(106, 76, 147, 1)',
    'rgba(25, 130, 196, 1)',
    'rgba(138, 201, 38, 1)',
    'rgba(255, 202, 58, 1)',
    'rgba(255, 89, 94, 1)';

  let chartConfig = {
    type: 'bar',
    data: {
      labels: graphData.map((x) => x.date),
      datasets: [
        {
          label: 'Mood',
          data: graphData.map((x) => x.mood),
          backgroundColor: [
            'rgba(106, 76, 147, 0.3)',
            'rgba(25, 130, 196, 0.3)',
            'rgba(138, 201, 38, 0.3)',
            'rgba(255, 202, 58, 0.3)',
            'rgba(255, 89, 94, 0.3)',
            'rgba(106, 76, 147, 0.3)',
            'rgba(25, 130, 196, 0.3)',
            'rgba(138, 201, 38, 0.3)',
            'rgba(255, 202, 58, 0.3)',
            'rgba(255, 89, 94, 0.3)',
          ],
          borderColor: [
            'rgba(106, 76, 147, 1)',
            'rgba(25, 130, 196, 1)',
            'rgba(138, 201, 38, 1)',
            'rgba(255, 202, 58, 1)',
            'rgba(255, 89, 94, 1)',
            'rgba(106, 76, 147, 1)',
            'rgba(25, 130, 196, 1)',
            'rgba(138, 201, 38, 1)',
            'rgba(255, 202, 58, 1)',
            'rgba(255, 89, 94, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Date',
            },
            ticks: {
              fontSize: 10,
            },
          },
        ],
        yAxes: [
          {
            fontSize: 20,
            scaleLabel: {
              display: true,
              labelString: 'Moods',
            },
            ticks: {
              min: 0,
              max: 5,
              fontSize: 15,
              callback: function (value, index, values) {
                if (value === 0) {
                  return value;
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
        {showAllTime ? 'Show Last Ten Moods' : 'Show All Time'}
      </Button>
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
  );
};

export default Graph;

// import React, from 'react';
// import Paper from '@material-ui/core/Paper';
// import {
//   Chart,
//   BarSeries,
//   Title,
//   ArgumentAxis,
//   ValueAxis,
// } from '@devexpress/dx-react-chart-material-ui';

// import { Animation} from '@devexpress/dx-react-chart';

// // const [mood, setMood] = useState([]);
// function Graph () {
// const data = [
//   { day: 'monday', mood: 5 },
//   { day: 'tuesday', mood: 2 },
//   { day: 'wednesday', mood: 3 },
//   { day: 'thursday', mood: 1 },
//   { day: 'friday', mood: 3 }

// ];

// const wweklyData = [
//     { week: 'one', mood: 5 },
//     { day: 'two', mood: 2 },
//     { day: 'three', mood: 3 },
//     { day: 'four', mood: 1 },
//     { day: 'five', mood: 3 }

//   ];
// //

// async function moodChart(
//   userId,
//   mood,
//   date
// ) {
//   try {
//     const res = await fetch(`${BACKEND_URL}/moods`, {
//       method: 'get',
//       body: JSON.stringify({
//         user_id: userId,
//         mood: mood,
//         date: date
//       }),
//       headers: { 'content-type': 'application/JSON' },
//     });
//     console.log(res);
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// //

//     return (
//       <Paper>
//         <Chart

//         >
//           <ArgumentAxis />
//           <ValueAxis max={7} />

//           <BarSeries
//             valueField="mood"
//             argumentField="day"
//           />
//           <Title text="Mood chart" />
//           <Animation />
//         </Chart>
//       </Paper>
//     );
//   }

// export default Graph
