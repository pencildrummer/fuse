import { Button, Form, Widget } from "../../../plugins/@fuse-labs/core-ui";
import Group from "../../../plugins/@fuse-labs/core-ui/components/shared/Group/Group";
import Label from "../../../plugins/@fuse-labs/core-ui/components/shared/Label/Label";
import Switch, { SwitchRaw } from "../../../plugins/@fuse-labs/core-ui/components/shared/Switch/Switch";
import Separator from "../../../plugins/@fuse-labs/core-ui/components/shared/Separator/Separator";
import BaudRateSelect from "./components/BaudRateSelect/BaudRateSelect";
import SerialPortSelect from "./components/SerialPortSelect/SerialPortSelect";
import { useDeviceContext } from "components/DeviceProvider/DeviceProvider";

export default function DeviceConnectionWidget() {

  const { device } = useDeviceContext()
  
  return <Widget title="Connection">
    <div className="grid grid-cols-2 gap-3">
      <Form initialValues={device}>
      <Group orientation="vertical">
        <Label htmlFor="serial-port">
          Serial port
        </Label>
        <SerialPortSelect name="port" id="serial-port"/>
      </Group>
      <Group orientation="vertical">
        <Label htmlFor="baud-rate">
          Baud rate
        </Label>
        <BaudRateSelect name="baudrate" id="baud-rate"/>
      </Group>
      </Form>

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
        <SwitchRaw id="auto-connect"/>
      </Group>
    </div>
  </Widget>
}