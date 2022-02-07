import { Button, Group, Input, Label, Widget } from "../../../core-ui";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js'
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2'
import { useState, useEffect } from "react";
import socket from "lib/client/socket";
import { CheckIcon } from "@radix-ui/react-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip
)

const DEFAULT_DATA = {
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
  
  const [targetNozzle, setTargetNozzle] = useState('')
  const [targetHeatbed, setTargetHeatbed] = useState('')

  function requestTargetNozzle() {
    socket.emit('@fuse-labs.marlin-temperature.setTarget.nozzle', parseInt(targetNozzle))
  }

  function requestTargetHeatbed() {
    socket.emit('@fuse-labs.marlin-temperature.setTarget.heatbed', parseInt(targetHeatbed))
  }

  const [data, setData] = useState(DEFAULT_DATA)

  useEffect(_ => {
    socket.on('@fuse-labs.marlin-temperature.getTemp.nozzle', (temperature) => {
      appendNozzleTemp(temperature)
    })
  
    socket.on('@fuse-labs.marlin-temperature.getTemp.heatbed', (temperature) => {
      appendHeatbedTemp(temperature)
    })
  }, [])
  
  function appendNozzleTemp(temperature) {
    setData(prevData => {
      let data = {...prevData}
      data.datasets[1].data.push({
        x: (new Date()).getTime(),
        y: temperature,
      })
      return data
    })
  }
  
  function appendHeatbedTemp(temperature) {
    setData(prevData => {
      let data = {...prevData}
      data.datasets[0].data.push({
        x: (new Date()).getTime(),
        y: temperature,
      })
      return data
    })
  }

  let minDate = (_ => {
    let date = new Date()
    date.setMinutes(date.getMinutes() - 1)
    return date.getTime()
  })()

  return <Widget title="Temperature" version="0.1">
    <Line options={{
      responsive: true,
      //animation: false,
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
          type: 'time',
          parsing: false,
          time: {
            unit: 'second',
          },
          grid: {
            display: false,
          },
          min: minDate,
          max: (new Date()).getTime(),
        },
        y: {
          suggestedMax: 150,
          suggestedMin: 0,
        }
      }
    }}
      data={data} />

    <Group>
      <Label>Nozzle target</Label>
      <Input value={targetNozzle} onChange={e => setTargetNozzle(e.target.value)} />
      <Button onClick={requestTargetNozzle} squared>
        <CheckIcon />
      </Button>
    </Group>

    <Group>
      <Label>Heatbed target</Label>
      <Input value={targetHeatbed} onChange={e => setTargetHeatbed(e.target.value)} />
      <Button onClick={requestTargetHeatbed} squared>
        <CheckIcon />
      </Button>
    </Group>

  </Widget>
}