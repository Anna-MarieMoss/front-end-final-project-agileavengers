import React, { useEffect, useRef, useState, useContext } from 'react';
import Chartjs from 'chart.js';
import { Button } from '@material-ui/core';
import { useAppContext } from '../../AppContext';
import { ThemeContext } from '../../ThemeContext';
import { colors } from './colors';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import UsersMoods from '../10.UsersMood/index';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Temp userId
//const userId = 1;

const Graph = () => {
  const { isAuthenticated, isLoading, accessToken, userData } = useAppContext();
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [graphData, setGraphData] = useState([
    { mood: 1 , date: '2021-01-01'},
    { mood: 3 , date: '2021-01-02'},
    { mood: 5 , date: '2021-01-03'},
    { mood: 3 , date: '2021-01-04'},
    { mood: 5 , date: '2021-01-05'},
    { mood: 1 , date: '2021-01-06'},
    { mood: 4 , date: '2021-01-07'},
    { mood: 3 , date: '2021-01-08'},
  ]);
  const [showGraph, setShowGraph] = useState(false);
  //const [getTenMoods, setGetTenMoods] = useState(true);
  const [graphToggle, setGraphToggle] = useState(true);
  const [graphType, setGraphType] = useState('line');
  // const [filterMood, setFilterMood] = useState('');
  let userId = userData?.id;
  //graph

  const theme = useContext(ThemeContext);
  //set Mui Dark Theme
  function muiTheme(theme) {
    if (theme === 'lightTheme') {
      return 'primary';
    } else return 'secondary';
  }

 console.log('this is graphToggle', graphToggle);
 console.log('this is graphType', graphType);
 console.log('this is graphData', graphData);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, graphData, graphType]);

  // re renders canvas?

  // const updateDataset = (datasetIndex, newData) => {
  //   chartInstance.data.datasets[datasetIndex].data = newData;
  //   chartInstance.update();
  // };

  function toggleChartType() {
    if (graphToggle){
      setGraphType('bar')
    }else{
      setGraphType('line');
    }
    setGraphToggle(!graphToggle);
    console.log('graph has changed');
  }

  // function filterByMood(event) {
  //   setFilterMood(event.target.value);
  // }

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
      setGraphData(data.payload.slice(0, 10));

      //chartConfig.data.datasets[0].data = graphData.map((x) => x.mood);
    }

    getMood();
  }, [graphToggle, userData]);

  console.log(`graphData is `, graphData);

  let chartConfig = {
    type: graphType,
    data: {
      labels: graphData.map((x) => x.date),
      datasets: [
        {
          label: 'Mood',
          data: graphData.map((x) => x.mood),
          backgroundColor: colors.backgroundColor.slice(0, graphData.length),
          borderColor: colors.borderColor.slice(0, graphData.length),
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
        onClick={toggleChartType}
        className='btn'
        variant='outlined'
        color={muiTheme(theme)}
      >
        Toggle Chart Type
      </Button>
      <canvas
        ref={chartContainer}
        style={{ width: '100em', height: '100em' }}
      />
      
    </div>
  );
};

export default Graph;
