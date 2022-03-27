import { Select } from "../../../shared";

export default function DeviceTypeSelect(props) {
  return <Select options={[
    { value: 'fdm_printer', label: 'FDM Printer' },
    { value: 'msla_printer', label: 'MSLA Printer' },
    { value: 'cnc', label: 'CNC' }
  ]} {...props} />
}