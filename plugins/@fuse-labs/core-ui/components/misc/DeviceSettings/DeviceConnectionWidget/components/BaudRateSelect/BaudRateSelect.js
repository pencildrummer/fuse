import Select from "@fuse-labs/core-ui/components/shared/Select/Select"

export default function BaudRateSelect({
  ...props
}) {

  const rates = [
    //{ label: 'Auto', value: 'auto' },
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