import { ComponentPropsWithoutRef } from "react";
import DevicePage from "../DevicePage/DevicePage";

export default function PrinterDevicePage({
  ...props
}: ComponentPropsWithoutRef<typeof DevicePage>) {
  return <DevicePage {...props}>{props.children}</DevicePage>;
}
