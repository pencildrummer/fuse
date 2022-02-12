import BaudRateSelect from "components/DeviceSettings/DeviceConnectionWidget/components/BaudRateSelect/BaudRateSelect";
import DeviceProfilePicker from "components/DeviceSettings/DeviceProfilePicker/DeviceProfilePicker";
import DeviceTypeSelect from "components/DeviceSettings/DeviceTypeSelect/DeviceTypeSelect";
import { usePorts } from "lib/client/ports";
import { Button, Group, Input, Label, Select, Separator, Form } from "plugins/@fuse-labs/core-ui";
import * as Yup from 'yup'

export default function AddDeviceForm({
  device
}) {

  const ports = usePorts()

  function handleSubmit(values, options) {
    console.log(values)
    console.log(options)
  }
  
  return (
    <Form initialValues={{
      'name': '',
      'type': '',
      'profile': '',
      'port': device?.port.path || '',
      'baudrate': ''
    }} validationSchema={Yup.object({
      name: Yup.string().required(),
      type: Yup.string().required(),
      profile: Yup.string().required(),
      port: Yup.string().required(),
      baudrate: Yup.number().required()
    })} onSubmit={handleSubmit}>
      <Group orientation="vertical">

        <Group orientation="vertical">
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" className="w-full" />
        </Group>

        <Group className="justify-between">
          <Label htmlFor="type">Device type</Label>
          <DeviceTypeSelect name="type" />
        </Group>

        <Group className="justify-between">
          <Label htmlFor="profile">Device profile</Label>
          <Select name="profile" options={['Custom', 'profile printer 1', 'profile printer 2']} />
        </Group>
        
        <Group orientation="vertical">
          <Label htmlFor="profile">Device profile</Label>
          <DeviceProfilePicker />
        </Group>
        <Separator />

        <Group orientation="vertical">
          <Group className="justify-between">
            <Label htmlFor="port">
              Port
            </Label>
            <Select name="port" options={ports?.map(p => p.path)} defaultValue={device?.port.path} />
          </Group>
          <Group className="justify-between">
            <Label htmlFor="baudrate">Baudrate</Label>
            <BaudRateSelect name="baudrate" />
          </Group>
        </Group>

        <Separator />

        <Group className="justify-end">
          <Button size="sm" type="submit">
            Save
          </Button>
        </Group>
      </Group>
    </Form>
  )
}