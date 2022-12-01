import { Widget } from "@fuse-labs/core-ui";
import { useTerminalCapableDeviceContext } from "../../hooks";
import TerminalPrompt from "./TerminalPrompt";
import TerminalProvider from "./TerminalProvider";
import TerminalWindow from "./TerminalWindow";

export default function MarlinTerminalWidget() {
  const { device } = useTerminalCapableDeviceContext();

  return (
    <Widget title="Terminal" version="0.1" className="h-96">
      <TerminalProvider terminal={device.terminal}>
        <TerminalWindow />

        <TerminalPrompt />
      </TerminalProvider>
    </Widget>
  );
}
