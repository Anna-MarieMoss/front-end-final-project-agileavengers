import React, { useEffect, useRef, useState, useContext } from 'react';
import Chartjs from 'chart.js';
import { Button } from '@material-ui/core';
import { useAppContext } from '../../AppContext';
import { ThemeContext } from '../../ThemeContext';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Temp userId
//const userId = 1;

const Graph = () => {
  const { isAuthenticated, isLoading, accessToken, userData } = useAppContext();
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [graphData, setGraphData] = useState([
    { date: 0 },
    { date: 0 },
    { date: 0 },
    { date: 0 },
    { date: 0 },
  ]);
  const [showGraph, setShowGraph] = useState(false);
  const [getTenMoods, setGetTenMoods] = useState(true);
  let userId = userData?.id;
  //graph

  const theme = useContext(ThemeContext);
  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

  const randomInt = () => Math.floor(Math.random() * (5 - 1 + 1)) + 1;

  // forcefully get mood date by clicking button

  function handleMood() {
    setShowGraph(true);
    console.log(`graph should be showing`);
  }

  // renders chart container, should re render when graphdata changes

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, graphData]);

  // re renders canvas?

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  // generates random data

  function getLastTenMoods(bool) {
    setGetTenMoods(bool);
  }

  const onButtonClick = () => {
    const data = [
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
    ];
    updateDataset(0, data);
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

      // get date in nice format

      console.log(`data payload is `, data.payload);
      // console.log(`data is ${JSON.stringify(data.payload[0].mood)}`)
      setGraphData(getTenMoods ? data.payload.slice(0, 10) : data.payload);

      //chartConfig.data.datasets[0].data = graphData.map((x) => x.mood);
    }

    getMood();
  }, [showGraph, userData, getTenMoods]);

  console.log(`graphData is `, graphData);

  let chartConfig = {
    type: 'bar',
    data: {
      labels: graphData.map((x) => x.date),
      datasets: [
        {
          label: 'Mood',
          data: graphData.map((x) => x.mood),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ].slice(0, graphData.length),
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ].slice(0, graphData.length),
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
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Moods',
            },
            ticks: {
              min: 0,
              max: 5,
              callback: function (value, index, values) {
                if (value === 0) {
                  return value;
                }
                if (value === 1) {
                  return '😢 ' + value;
                }
                if (value === 2) {
                  return '😒 ' + value;
                }
                if (value === 3) {
                  return '😬 ' + value;
                }
                if (value === 4) {
                  return '😀 ' + value;
                }
                if (value === 5) {
                  return '😍 ' + value;
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
        onClick={() => getLastTenMoods(true)}
        className='btn'
        variant='outlined'
        color={muiTheme(theme)}
      >
        Last 10 Moods
      </Button>
      <Button
        onClick={() => getLastTenMoods(false)}
        className='btn'
        variant='outlined'
        color={muiTheme(theme)}
      >
        All Time Moods
      </Button>
      <canvas
        ref={chartContainer}
        style={{ width: '100em', height: '100em' }}
      />
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
