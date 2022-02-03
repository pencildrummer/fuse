import Select from "../../../../../plugins/@fuse-labs/core-ui/components/shared/Select/Select"

export default function BaudRateSelect({
  ...props
}) {

  const rates = [
    'Auto',
    4800,
    9600,
    14400,
    19200,
    38400,
    57600,
    115200
  ]

  return <Select options={rates} {...props} />
}