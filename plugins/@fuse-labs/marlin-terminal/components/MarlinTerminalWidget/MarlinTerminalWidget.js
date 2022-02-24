import { useDeviceContext } from "components/DeviceProvider/DeviceProvider";
import React, { useEffect } from "react";
import { Widget } from "../../../core-ui";
import TerminalPrompt from "./TerminalPrompt";
import TerminalProvider from "./TerminalProvider";
import TerminalWindow from "./TerminalWindow";

export default function MarlinTerminalWidget() {

  const { device } = useDeviceContext()

  return <Widget title="Terminal" version="0.1" className="h-96">
    <TerminalProvider terminal={device.terminal}>

      <TerminalWindow/>

      <TerminalPrompt />

    </TerminalProvider>
  </Widget>
}