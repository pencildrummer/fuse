import BaudRateSelect from "../DeviceSettings/DeviceConnectionWidget/components/BaudRateSelect/BaudRateSelect";
import DeviceProfilePicker from "../DeviceSettings/DeviceProfilePicker/DeviceProfilePicker";
import { Field } from "formik";
import Select from '../../shared/Select/Select'
import { Button, Group, Input, Label, Separator, Form, DisplayGroup, InputRaw } from "../../shared";
import * as Yup from 'yup'
import { useSerialPorts, coreSocket } from "@fuse-labs/core-client";
import { getSuggestedName } from "@fuse-labs/shared-utils";

export default function DeviceForm({
  device
}) {

  const ports = useSerialPorts()

  function handleSubmit(values, options) {
    if (!device.id) {
      coreSocket.emit('devices:add', values, (deviceData) => {
        console.log('Created device')
      })
    } else {
      coreSocket.emit('devices:update', device.id, values, (deviceData) => {
        console.log('Updated device')
      })
    }
  }

  return (
    <Form enableReinitialize initialValues={{
      'id': device.id || '',
      'name': device.name || getSuggestedName(device?.vendorId, device?.productId),
      'profileId': device.profile?.id || device.profileId || '',
      'port': device?.port || '',
      'baudrate': device?.baudrate || 'auto',
      'serialNumber': device?.serialNumber,
      'vendorId': device?.vendorId,
      'productId': device?.productId,
    }} validationSchema={Yup.object({
      name: Yup.string().required(),
      profileId: Yup.string().required(),
      port: Yup.string().required(),
      baudrate: Yup.mixed().required()
    })} onSubmit={handleSubmit}>{ ({ values, initialValues, errors, touched, ...formProps }) => (
      <Group orientation="vertical">

        <Input type="hidden" name="id" />

        <Group orientation="vertical">
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" className="w-full" autoComplete="off" />
        </Group>

        <Separator />

        <Group orientation="vertical" className="text-xs">
          <DisplayGroup label="Serial number" value={values.serialNumber || '-'} />
          <DisplayGroup label="Vendor ID" value={values.vendorId || '-'} />
          <DisplayGroup label="Product ID" value={values.productId || '-'} />
        </Group>

        <Separator />
        
        <Group orientation="vertical">
          <Group className="justify-between">
            <Label htmlFor="profile">Device profile</Label>
            <InputRaw placeholder="No profile selected"
              className="!bg-transparent !border-dashed !ring-0"
              error={formProps.submitCount && errors.profileId}
              disabled
              value={values.profileId} />
          </Group>
          <Field name="profileId" component={DeviceProfilePicker} />
        </Group>
        <Separator />

        <Group orientation="vertical">
          <Group className="justify-between">
            <Label htmlFor="port">
              Port
            </Label>
            {initialValues.port ? (
              <InputRaw value={initialValues.port} disabled className="w-max"/>
            ) : (
              <Select name="port" options={ports?.map(p => p.path)} defaultValue={device?.port.path} />
            )}
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
