import DeviceProfile from './DeviceProfile.js'

export default class PrinterDeviceProfile extends DeviceProfile {

  volume;       // PrinterDeviceVolume - Print volume based on provided config width, height and depth

  bed;          // PrinterDeviceBed - The bed of the printer, size is determined by printArea

  extruders;    // [PrinterExtruder] - Extruders available on this printer

  gCodeVersion; // Type of GCode used (from Cura)

  beginGCode;   // Custom printer GCode to attach at the begin of the print process
  endGCode;     // Custom printer GCode to attach at the end of the print process

  xAxis         // PrinterDeviceAxis - X axis definition
  yAxis         // PrinterDeviceAxis - Y axis definition
  zAxis         // PrinterDeviceAxis - Z axis definition

  constructor(params) {
    const { volume, bed, extruders, xAxis, yAxis, zAxis, gCodeVersion, ...rest } = params
    super(rest)
    this.volume = volume
    this.bed = bed
    this.extruders = extruders
    this.xAxis = xAxis
    this.yAxis = yAxis
    this.zAxis = zAxis
    this.gCodeVersion = gCodeVersion
  }

}