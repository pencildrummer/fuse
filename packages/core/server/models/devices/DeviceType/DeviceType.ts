const types = {
  FDMPrinter: "fdm_printer",
  MSLAPrinter: "msla_printer",
  CNC: "cnc",
  Laser: "laser",
};
const DeviceType = Object.freeze({
  ...types,
  ALL: Object.values(types),
});
export default DeviceType;
