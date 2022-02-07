const signale = require("signale");

module.exports = (socket) => {

  // Init temperature reading daemon here?

  let nozzleTarget = null;
  let heatbedTarget = null;

  // Init socket listeners and emitters
  
  socket.on('@fuse-labs.marlin-temperature.setTarget.nozzle', (temp, fn) => {
    signale.info('Requested nozzle temperature:', temp)
    // TODO - Set temperature target on device
    nozzleTarget = temp
    fn?.(true)
  })

  socket.on('@fuse-labs.marlin-temperature.setTarget.heatbed', (temp, fn) => {
    signale.info('Requested heatbed temperature:', temp)
    // TODO - Set temperature target on device
    heatbedTarget = temp
    fn?.(true)
  })

  // DEMO
  let nozzle = 10
  let heatbed = 12
  let nozzleFaker, heatbedFaker;

  nozzleFaker = setInterval(_ => {
    nozzle = fakeTemp(nozzle, nozzleTarget ? nozzleTarget : 10, 1)
    socket.emit('@fuse-labs.marlin-temperature.getTemp.nozzle', nozzle)
  }, 1000)
  heatbedFaker = setInterval(_ => {
    heatbed = fakeTemp(heatbed, heatbedTarget ? heatbedTarget : 12, 1)
    socket.emit('@fuse-labs.marlin-temperature.getTemp.heatbed', heatbed)
  }, 1000)

  return _ => {
    // Remove debug interval on disconnection
    clearInterval(nozzleFaker)
    clearInterval(heatbedFaker)
  }

}

// DEMO
function fakeTemp(currentTemp, max, inc) {
  // Inc random
  if (currentTemp > max) {
    currentTemp -= inc
  } else {
    currentTemp += inc * Math.floor(Math.random() * 10)
  }
  return currentTemp
}