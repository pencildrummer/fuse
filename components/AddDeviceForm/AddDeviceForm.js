import BaudRateSelect from "components/DeviceSettings/DeviceConnectionWidget/components/BaudRateSelect/BaudRateSelect";
import DeviceProfilePicker from "components/DeviceSettings/DeviceProfilePicker/DeviceProfilePicker";
import { Field, useFormikContext } from "formik";
import { usePorts } from "lib/client/ports";
import socket from "lib/client/socket";
import { Button, Group, Input, Label, Select, Separator, Form } from "plugins/@fuse-labs/core-ui";
import { InputRaw } from "plugins/@fuse-labs/core-ui/components/shared/Input/Input";
import * as Yup from 'yup'

export default function AddDeviceForm({
  device
}) {

  const ports = usePorts()

  function handleSubmit(values, options) {
    socket.emit('core.devices.add', values, (device) => {
      console.log('Created device')
      console.debug(device)
    })
  }
  
  return (
    <Form initialValues={{
      'name': '',
      'profileId': '',
      'port': device?.port.path || '',
      'baudrate': 'auto'
    }} validationSchema={Yup.object({
      name: Yup.string().required(),
      profileId: Yup.string().required(),
      port: Yup.string().required(),
      baudrate: Yup.mixed().required()
    })} onSubmit={handleSubmit}>{ ({ values, errors, touched, ...formProps }) => (
      <Group orientation="vertical">
        {console.log(values, errors)}

        <Group orientation="vertical">
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" className="w-full" autoComplete="off" />
        </Group>
        
        <Group orientation="vertical">
          <Group className="justify-between">
            <Label htmlFor="profile">Device profile</Label>
            <InputRaw placeholder="No profile selected"
              className="!bg-transparent !border-dashed !ring-0"
              error={formProps.submitCount && errors.profile}
              disabled
              defaultValue={values.profileId}/>
          </Group>
          <Field name="profileId" component={DeviceProfilePicker} />
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
          <Button type="submit">
            Save
          </Button>
        </Group>
      </Group>
    )}</Form>
  )
}
