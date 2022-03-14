import { SelectRaw } from "../../../../../shared"

export default function SerialPortSelect({
  ...props
}) {

  const ports = [
    {
      label: '/dev/susb.001',
      value: '/dev/susb.001'
    },
    {
      label: '/dev/susb.002',
      value: '/dev/susb.002'
    }
  ]

  return <SelectRaw options={ports} {...props} />
}