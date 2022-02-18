import SettingsWidget from "../../../core-ui/components/SettingsWidget/SettingsWidget";
import Group from "../../../core-ui/components/shared/Group/Group";
import { InputRaw } from "../../../core-ui/components/shared/Input/Input";
import Label from "../../../core-ui/components/shared/Label/Label";
import { useDeviceContext } from "components/DeviceProvider/DeviceProvider";
import { Terminal } from "../../lib/client/terminal.ts";
import { Button } from "plugins/@fuse-labs/core-ui";

export default function MarlinTerminalSettingsWidget({
  ...props
}) {

  const { device, terminal } = useDeviceContext()

  function handleConnectClick() {
    // TODO - Make a provider to use same terminal obj
    terminal.connect()
  }

  function handleDisconnectClick() {
    // TODO - Make a provider to use same terminal obj
    terminal.disconnect()
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