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
  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0]);
  const [showGraph, setShowGraph] = useState(false);
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

  function handleMood() {
    setShowGraph(true);
    console.log(`graph should be showing`);
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, graphData]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

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

      console.log(`data payload is `, data.payload);
      // console.log(`data is ${JSON.stringify(data.payload[0].mood)}`)
      setGraphData(data.payload);
      console.log(`graphData state is`, graphData);
      //chartConfig.data.datasets[0].data = graphData.map((x) => x.mood);
    }

    getMood();
  }, [showGraph]);

  'rgba(106, 76, 147, 1)',
    'rgba(25, 130, 196, 1)',
    'rgba(138, 201, 38, 1)',
    'rgba(255, 202, 58, 1)',
    'rgba(255, 89, 94, 1)';

  let chartConfig = {
    type: 'bar',
    data: {
      labels: [
        'Day One',
        'Day Two',
        'Day Three',
        'Day Four',
        'Day Five',
        'Day One',
        'Day Two',
        'Day Three',
        'Day Four',
        'Day Five',
      ],
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
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
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
        onClick={onButtonClick}
        className='btn'
        variant='outlined'
        color={muiTheme(theme)}
      >
        Switch View
      </Button>
      <Button
        onClick={handleMood}
        className='btn'
        variant='outlined'
        color={muiTheme(theme)}
      >
        Get Mood Data
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
