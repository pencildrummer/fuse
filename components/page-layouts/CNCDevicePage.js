import GRBLMoveWidget from "plugins/@fuse-labs/grbl-move/components/GRBLMoveWidget/GRBLMoveWidget";
import DevicePage from "./DevicePage";

export default function CNCDevicePage({
  children,
  ...props
}) {
  return <DevicePage {...props}>
    <GRBLMoveWidget />
    {children}
  </DevicePage>
}