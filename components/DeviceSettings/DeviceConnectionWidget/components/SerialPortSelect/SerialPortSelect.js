import { SelectRaw } from "plugins/@fuse-labs/core-ui/components/shared/Select/Select"

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