import DevicePage from "./DevicePage"

export default function PrinterDevicePage({
  children,
  ...props
}) {
  return <DevicePage {...props}>
    {children}
  </DevicePage>
}