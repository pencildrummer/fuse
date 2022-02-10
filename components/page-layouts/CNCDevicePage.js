import DevicePage from "./DevicePage";

export default function CNCDevicePage({
  children,
  ...props
}) {
  return <DevicePage {...props}>
    {props.children}
  </DevicePage>
}