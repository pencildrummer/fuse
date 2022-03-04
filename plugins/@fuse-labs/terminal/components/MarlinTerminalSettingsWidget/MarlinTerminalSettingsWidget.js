import { useDeviceContext } from "@fuse-labs/core-client";
import { Group, Label, InputRaw, Button, SettingsWidget } from "@fuse-labs/core-ui";

export default function MarlinTerminalSettingsWidget({
  ...props
}) {

  const { device } = useDeviceContext()

  function handleConnectClick() {
    // TODO - Make a provider to use same terminal obj
    device.terminal.connect()
  }

  function handleDisconnectClick() {
    // TODO - Make a provider to use same terminal obj
    device.terminal.disconnect()
  }

  return <SettingsWidget>
    <Group className="!justify-start">
      <Button onClick={handleConnectClick}>
        Connect
      </Button>
      <Button onClick={handleDisconnectClick}>
        Disconnect
      </Button>
    </Group>
    <div className="grid grid-cols-2 gap-4">
      <Group orientation="vertical">
        <Label htmlFor="serial-port">
          Serial port
        </Label>
        <InputRaw id="serial-port" disabled value={device.port}/>
      </Group>
      <Group orientation="vertical">
        <Label htmlFor="baud-rate">
          Baud rate
        </Label>
        <InputRaw id="baud-rate" value={device.baudrate} disabled/>
      </Group>
    </div>
  </SettingsWidget>
}