import { Plugin } from '@fuse-labs/core/server'
import signale from 'signale';

export default class MarlinTemperaturePlugin extends Plugin {

  provision() {
    // TODO - Add temperature parser to device controller
  }

  initDeviceSocket(socket) {

    // DEMO
    let nozzle = 10
    let heatbed = 12
    let nozzleFaker, heatbedFaker;
      // Init temperature reading daemon here?

    let nozzleTarget = null;
    let heatbedTarget = null;

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