import { Button, Widget } from "../../../plugins/@fuse-labs/core-ui";
import Group from "../../../plugins/@fuse-labs/core-ui/components/shared/Group/Group";
import Label from "../../../plugins/@fuse-labs/core-ui/components/shared/Label/Label";
import Switch from "../../../plugins/@fuse-labs/core-ui/components/shared/Switch/Switch";
import Checkbox from "../../../plugins/@fuse-labs/core-ui/components/shared/Checkbox/Checkbox";
import Separator from "../../../plugins/@fuse-labs/core-ui/components/shared/Separator/Separator";
import BaudRateSelect from "./components/BaudRateSelect/BaudRateSelect";
import SerialPortSelect from "./components/SerialPortSelect/SerialPortSelect";

export default function DeviceConnectionWidget() {
  return <Widget title="Connection">
    <div className="grid grid-cols-2 gap-3">
      <Group orientation="vertical">
        <Label htmlFor="serial-port">
          Serial port
        </Label>
        <SerialPortSelect id="serial-port"/>
      </Group>
      <Group orientation="vertical">
        <Label htmlFor="baud-rate">
          Baud rate
        </Label>
        <BaudRateSelect id="baud-rate"/>
      </Group>

      <div>

      </div>

      <Group className="grid grid-cols-2">
        <Button>
          Test connection
        </Button>
        <Button>
          Save
        </Button>
      </Group>
    </div>

    <Separator />

    <div>
      <Group className="justify-between">
        <Label htmlFor="auto-connect">
          Automatically connect on startup
        </Label>
        <Switch id="auto-connect"/>
      </Group>
    </div>
  </Widget>
}