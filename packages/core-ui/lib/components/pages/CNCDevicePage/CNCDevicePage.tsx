// import GRBLMoveWidget from "plugins/@fuse-labs/grbl-move/components/GRBLMoveWidget/GRBLMoveWidget";
import { ComponentPropsWithoutRef } from "react";
import DevicePage from "../DevicePage/DevicePage";

export default function CNCDevicePage({
  ...props
}: ComponentPropsWithoutRef<typeof DevicePage>) {
  return (
    <DevicePage {...props}>
      {/* <GRBLMoveWidget /> */}
      {props.children}
    </DevicePage>
  );
}
