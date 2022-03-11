import { Plugin } from '@fuse-labs/core/server'
import signale from 'signale';

export default class MarlinTemperaturePlugin extends Plugin {

  provision() {
    // TODO - Add temperature parser to device controller
  }

  initDeviceSocket(socket) {

    let nozzleTarget = null;
    let heatbedTarget = null;

    setInterval(_ => {
      console.log('Sending demo temperature', socket.device.namespace.name)
      socket.device.namespace.emit('data:temperature', {
        bed: {
          current: 20,
          target: 60
        },
        chamber: {
          current: 10
        },
        ambient: {
          current: 18
        }
      })
    }, 1500)

    // Init socket listeners and emitters
    
    socket.on('nozzle:set', (temp, fn) => {
      signale.info('Requested nozzle temperature:', temp)
      // TODO - Set temperature target on device
      nozzleTarget = temp
      fn?.(true)
    })

    socket.on('heatbed:set', (temp, fn) => {
      signale.info('Requested heatbed temperature:', temp)
      // TODO - Set temperature target on device
      heatbedTarget = temp
      fn?.(true)
    })

  }

}