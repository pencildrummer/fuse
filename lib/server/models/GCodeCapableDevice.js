import Device from "./Device.js";

export default class GCodeCapableDevice extends Device {

  constructor(portPath, baudRate) {

    super(portPath, baudRate)
    // Add all G mapped available methods
    // MAYBE
  }

  sendGCode(gCode) {
    this.port.write(gCode+"\n")
  }

  G0(x, y, z, f = null)  {
    let gCode = 'G0 '
    if (f) { gCode += `F${f}` }
    if (x) { gCode += `X${x}` }
    if (y) { gCode += `Y${y}` }
    if (z) { gCode += `Z${z}` }
    this.sendGCode(gCode)
  }
  // Helper for each axis
  G0_X(x, f = null) { this.G0(x, null, null, f) }
  G0_Y(y, f = null) { this.G0(null, y, null, f) }
  G0_Z(z, f = null) { this.G0(null, null, z, f) }

  G91() { this.sendGCode('G91') }

}