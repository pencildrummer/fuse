import DevicePage from "./DevicePage";

export default function CNCDevicePage({
  children,
  ...props
}) {
  return <DevicePage {...props}>
    <div className="rounded-md bg-gray-800 text-gray-300 p-3">CNC</div>
    {props.children}
  </DevicePage>
}