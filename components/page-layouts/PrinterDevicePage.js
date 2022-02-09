import DevicePage from "./DevicePage"

export default function PrinterDevicePage({
  children,
  ...props
}) {
  return <DevicePage {...props}>
    <div className="rounded-md bg-gray-900 text-gray-300 p-3">FDM printer</div>
    {children}
  </DevicePage>
}