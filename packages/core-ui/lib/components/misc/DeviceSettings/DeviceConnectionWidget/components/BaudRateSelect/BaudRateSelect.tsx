import { Select } from "../../../../../shared";

export default function BaudRateSelect({ ...props }) {
  const rates = [
    { label: "Auto", value: "0" },
    "4800",
    "9600",
    "14400",
    "19200",
    "38400",
    "57600",
    "115200",
  ];

  return <Select options={rates} {...props} />;
}
