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
import { useDeviceContext } from "@fuse-labs/core-client";
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button, Group, Label, Widget, InputRaw } from "@fuse-labs/core-ui";
import merge from 'lodash/merge'

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
      key: 'bed',
      label: 'Bed',
      borderColor: '#0891b2',
      data: []
    },
    {
      key: 'hotend',
      label: 'Hotend',
      borderColor: '#db2777',
      data: []
    },
    {
      key: 'chamber',
      label: 'Chamber',
      borderColor: '#0000ff',
      data: []
    },
    {
      key: 'ambient',
      label: 'Ambient',
      borderColor: '#65a30d',
      data: []
    },
  ]
}

export default function TemperatureWidget() {
  
  const { device } = useDeviceContext()

  const [data, setData] = useState(DEFAULT_DATA)

  const [temperature, setTemperature] = useState({})
  const [userTargetTemperature, setUserTargetTemperature] = useState({})

  useEffect(_ => {
    let handleTemperatureData = temperature => {
      // Updated latest temperature state
      setTemperature(prevTemperature => merge({...prevTemperature}, temperature))
      // Updated graph data
      setData(prevData => {
        let data = {...prevData}
        Object.keys(temperature).forEach(key => {
          // Get dataset with key if any
          let dataset = data.datasets.find(d => d.key == key)
          if (dataset) {
            // Add new current temperature to data
            if (temperature[key].current) {
              dataset.data.push({
                x: (new Date()).getTime(),
                y: temperature[key].current
              })
            }
          } else {
            console.log('No dataset found for key:', key)
          }
        })
        return data
      })
    }
    device.socket.on('data:temperature', handleTemperatureData)
    return _ => device.socket.off('data:temperature', handleTemperatureData)
  }, [device])

  function requestTargetHotend() {
    if (userTargetTemperature.hotend)
      device.socket.emit('nozzle:set', parseInt(userTargetTemperature.hotend))
  }

  function requestTargetBed() {
    if (userTargetTemperature.bed)
      device.socket.emit('heatbed:set', parseInt(userTargetTemperature.bed))
  }

  function setKeyTargetTemperature(key, value) {
    setUserTargetTemperature(t => ({...t, [key]: value}))
  }

  let minDate = (_ => {
    let date = new Date()
    date.setMinutes(date.getMinutes() - 1)
    return date.getTime()
  })()

  return <Widget title="Temperature" version="0.1" className="col-span-3">
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
      datasetIdKey="key"
      data={data} />

    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
      
      <TemperatureField valueKey="hotend" label="Hotend"
        value={userTargetTemperature.hotend}
        onChange={value => setKeyTargetTemperature('hotend', value)}
        onSend={requestTargetHotend}
        currentValue={temperature?.hotend?.current}
        currentTargetValue={temperature?.hotend?.target} />
    
      <TemperatureField valueKey="bed" label="Bed"
        value={userTargetTemperature.bed}
        onChange={value => setKeyTargetTemperature('bed', value)}
        onSend={requestTargetBed}
        currentValue={temperature?.bed?.current}
        currentTargetValue={temperature?.bed?.target} />
        
      <TemperatureField valueKey="ambient" label="Ambient"
        currentValue={temperature?.ambient?.current}
        editable={false} />

      <TemperatureField valueKey="chamber" label="Chamber"
        currentValue={temperature?.chamber?.current}
        editable={false} />
    </div>

  </Widget>
}


function TemperatureField({
  valueKey,
  label,
  value,
  currentTargetValue,
  onChange,
  onSend,
  editable = true,
  ...props
}) {
  
  function handleChange(e) {
    onChange?.(e.target.value)
  }

  return (
    <Group className="justify-start">
      <Label className="flex-1 truncate flex items-center space-x-2"
        htmlFor={`temperature-${valueKey}`}>
        <span>{label || valueKey}</span>
      </Label>
      {editable &&
      (<>
      <InputRaw name={`temperature-${valueKey}`}
        value={value}
        onChange={handleChange} 
        className="w-[60px] text-right"
        detailContent="°C" />
      <Button onClick={onSend} squared>
        <ArrowRightIcon />
      </Button>
      </>)}
      <InputRaw disabled value={currentTargetValue}
        className="w-[60px] text-right"
        detailContent="°C"/>
    </Group>
  )
}