import { Widget } from "../../../core-ui";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
)

function fakeTemp(k, min, max, inc, randK) {
  let startTemp = min
  let targetTemp = max
  let currentTemp = startTemp
  let data = []
  for (let i = 0; i < k; i++) {
    data.push(currentTemp)

    // Inc random
    if (currentTemp > targetTemp) {
      currentTemp -= inc
    } else {
      currentTemp += inc * Math.floor(Math.random() * randK)
    }
  }
  return data
}

const DEFAULT_DATA = {
  labels: [],
  datasets: [
    {
      label: 'Heatbed',
      borderColor: '#0891b2',
      data: []
    },
    {
      label: 'Nozzle',
      borderColor: '#db2777',
      data: []
    }
  ]
}

export default function TemperatureWidget() {
  
  const [data, setData] = useState(DEFAULT_DATA)

  useEffect(_ => {
    let k = 50
    let fakeData = DEFAULT_DATA
    for (let i = 0; i < k; i++) { fakeData.labels.push((new Date()).getTime()) }
    fakeData.datasets[0].data = fakeTemp(k, 12, 70, 2, 3)
    fakeData.datasets[1].data = fakeTemp(k, 5, 250, 5, 4)
    setData(fakeData)
  }, [])

  return <Widget title="Temperature" version="0.1">
    <Line options={{
      responsive: true,
      datasets: {
        line: {
          tension: 0.6,
          cubicInterpolationMode: 'monotone',
          borderWidth: 1,
          pointRadius: 0,
        }
      },
      interaction: {
        intersect: false
      },
      plugins: {
        tooltip: {
          enabled: true,
        }
      },
      scales: {
        x: {
          display: false,
          grid: {
            display: false,
          }
        },
        y: {
          suggestedMax: 150,
          suggestedMin: 0,
        }
      }
    }}
      data={data} />
  </Widget>
}