import {
  Button,
  Group,
  InputRaw,
  Label,
  SettingsWidget,
  useDeviceStatusListContext,
} from "@fuse-labs/core-ui";
import { TerminalCapableClientDevice } from "../..";
import { useTerminalCapableDeviceContext } from "../../hooks";

export default function MarlinTerminalSettingsWidget({ ...props }) {
  const { device } = useTerminalCapableDeviceContext();
  const { addStatus, removeStatus } = useDeviceStatusListContext();

  function handleConnectClick() {
    // TODO - Make a provider to use same terminal obj
    (device as TerminalCapableClientDevice).terminal.connect();

    // TEST
    let status = addStatus("Prova messaggio di testo dello stato device", {
      type: "warning",
    });
    setTimeout((_) => removeStatus(status.id), 1500);
  }

  function handleDisconnectClick() {
    // TODO - Make a provider to use same terminal obj
    device.terminal.disconnect();
  }

  return (
    <SettingsWidget>
      <Group className="!justify-start">
        <Button onClick={handleConnectClick}>Connect</Button>
        <Button onClick={handleDisconnectClick}>Disconnect</Button>
      </Group>
      <div className="grid grid-cols-2 gap-4">
        <Group orientation="vertical">
          <Label htmlFor="serial-port">Serial port</Label>
          <InputRaw id="serial-port" disabled value={device.portPath} />
        </Group>
        <Group orientation="vertical">
          <Label htmlFor="baud-rate">Baud rate</Label>
          <InputRaw id="baud-rate" value={device.baudrate} disabled />
        </Group>
      </div>
    </SettingsWidget>
  );
}
