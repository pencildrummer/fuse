import BaudRateSelect from "./components/BaudRateSelect/BaudRateSelect";
import SerialPortSelect from "./components/SerialPortSelect/SerialPortSelect";
import { Group, Button, Form, Widget, Label, Separator, SwitchRaw } from "../../../shared";
import { useDeviceContext } from "@fuse-labs/core-client"

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