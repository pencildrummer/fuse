import { usePorts } from "lib/client/ports";
import { Button, Dialog, Group, Input, Label, Select, Separator } from "plugins/@fuse-labs/core-ui";

export default function AddDeviceForm({
  device
}) {

  const ports = usePorts()

  return (
    <Group orientation="vertical">

      <Group orientation="vertical">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" className="w-full" />
      </Group>

      <Group className="justify-between">
        <Label htmlFor="type">Device type</Label>
        <Select name="type" options={["fdm_printer", "msla_printer", "cnc"]} />
      </Group>

      <Group className="justify-between">
        <Label htmlFor="device_profile">Device profile</Label>
        <Select name="device_profile" options={['Custom', 'profile printer 1', 'profile printer 2']} />
      </Group>
      
      <Separator />

      <Group orientation="vertical">
        <Group className="justify-between">
          <Label htmlFor="port">
            Port
          </Label>
          <Select options={ports?.map(p => p.path)} defaultValue={device?.port.path} />
        </Group>
        <Group className="justify-between">
          <Label htmlFor="baudrate">Baudrate</Label>
          <Select options={[]} />
        </Group>
      </Group>

      <Separator />

      <Group className="justify-end">
        <Button size="sm">
          Save
        </Button>
      </Group>
    </Group>
  )
}