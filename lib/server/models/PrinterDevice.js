import GCodeCapableDevice from "./GCodeCapableDevice.js";

export default class PrinterDevice extends GCodeCapableDevice {
  // Specific GCode command for Printer
  // G0 with E parameter
  // G0(f, x, y, z): void;

  // G0(e, f, x, y, z): void  {
  //   let gCode = 'G0 '
  //   if (e) { gCode += `E${e}` }
  //   if (f) { gCode += `F${f}` }
  //   if (x) { gCode += `X${x}` }
  //   if (y) { gCode += `Y${y}` }
  //   if (z) { gCode += `Z${z}` }
  //   this.sendGCode(gCode)
  // }
}