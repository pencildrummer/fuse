import { SelectRaw } from "plugins/@fuse-labs/core-ui/components/shared/Select/Select"

export default function BaudRateSelect({
  ...props
}) {

  const rates = [
    { label: 'Auto', value: 0 },
    4800,
    9600,
    14400,
    19200,
    38400,
    57600,
    115200
  ]

  return <SelectRaw options={rates} {...props} />
}