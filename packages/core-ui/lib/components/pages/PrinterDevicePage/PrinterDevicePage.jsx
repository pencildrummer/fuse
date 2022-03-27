import DevicePage from "../DevicePage/DevicePage"

export default function PrinterDevicePage({
  children,
  ...props
}) {
  return <DevicePage {...props}>
    {children}
  </DevicePage>
}