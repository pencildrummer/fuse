import { HomeIcon, ThickArrowDownIcon, ThickArrowLeftIcon, ThickArrowRightIcon, ThickArrowUpIcon } from '@radix-ui/react-icons'
import socket from 'lib/client/socket'
import { Widget, ToggleGroup } from 'plugins/@fuse-labs/core-ui/index.js'
import { useState } from 'react'
import { Button } from '../../../core-ui'

function MoveButton({
  ...props
}) {
  return <Button squared>
    {props.children}
  </Button>
}

export default function MoveWidget() {

  // TODO
  //const { device } = useDeviceContext()
  const device = { id: 'TEST', portPath: 'serialPortPath', baudRate: 0 }

  const [distanceInc, setDistanceInc] = useState("1")

  // This will be handled in a core lib
  function handleConnect() {
    socket.emit('@fuse-labs.marlin-move.openDevice', device, (result) => {
      console.log('Result', result)
    })
  }

  // This is specific for the move plugin
  // Maybe extends GCodeCapableDevice prototype to add move methods?
  function handleMove(direction) {
    socket.emit('@fuse-labs.marlin-move.move.x', 10, (res) => {
      console.log('Move result', res)
    })
  }

  return (
    <Widget title="Manual position" version="0.1">

      <div>
        To be removed, just to test device connection and move
        <Button onClick={handleConnect}>
          Connect
        </Button>
      </div>
      <div className='flex flex-row space-x-6'>
        <div className='grid grid-cols-3 grid-rows-3 gap-2'>
          <div />
          <div>
            <MoveButton onClick={handleMove('up')}>
              <ThickArrowUpIcon />
            </MoveButton>
          </div>
          <div />

          <div>
            <MoveButton onClick={handleMove('left')}>
              <ThickArrowLeftIcon />
            </MoveButton>
          </div>
          <div>
            <div className='relative w-full h-full text-[10px] font-mono'>
              <span className='absolute top-1/2 left-1/2 translate-x-[-8px] translate-y-[-12px]'>
                X
              </span>
              <span className='absolute top-1/2 left-1/2 translate-x-[-1px] translate-y-[-8px]'>
                /
              </span>
              <span className='absolute top-1/2 left-1/2 translate-x-[5px] translate-y-[-3px]'>
                Y
              </span>
            </div>
          </div>
          <div>
            <MoveButton onClick={handleMove('right')}>
              <ThickArrowRightIcon />
            </MoveButton>
          </div>

          <div />
          <div>
            <MoveButton onClick={handleMove('down')}>
              <ThickArrowDownIcon />
            </MoveButton>
          </div>
          <div />
        </div>

        <div className='grid grid-cols-1 grid-rows-3 gap-2'>
          <div>
            <MoveButton>
              <ThickArrowUpIcon />
            </MoveButton>
          </div>
          <div>
            <div className='relative w-full h-full text-[10px] font-mono'>
              <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                Z
              </span>
            </div>
          </div>
          <div>
            <MoveButton>
              <ThickArrowDownIcon />
            </MoveButton>
          </div>
        </div>
      </div>

      <div>
        <ToggleGroup type="single"
          value={distanceInc}
          onValueChange={v => setDistanceInc(v)}>
          <ToggleGroup.Item value="0.1">
            0.1
          </ToggleGroup.Item>
          <ToggleGroup.Item value="1">
            1
          </ToggleGroup.Item>
          <ToggleGroup.Item value="10">
            10
          </ToggleGroup.Item>
          <ToggleGroup.Item value="100">
            100
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>
    </Widget>
  )
}