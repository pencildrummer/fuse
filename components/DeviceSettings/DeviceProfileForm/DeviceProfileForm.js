import { Button, Form, Group, Input, Label, Separator } from "plugins/@fuse-labs/core-ui";
import DeviceTypeSelect from "../DeviceTypeSelect/DeviceTypeSelect";

export default function DeviceProfileForm({
  ...props
}) {
  return (
    <Form initialValues={{
      brand: '',
      model: '',
      type: 'fdm_printer',
    }} {...props}>
      <Group orientation="vertical">
        <Group>
          <Label>Brand</Label>
          <Input name="brand" />
        </Group>
        <Group>
          <Label>Model</Label>
          <Input name="model" />
        </Group>
        <Group>
          <Label>Device type</Label>
          <DeviceTypeSelect name="type" />
        </Group>
      </Group>
      <Separator />
      <div className="flex-1">

      </div>
      <Separator />
      <Group className="justify-end">
        <Button>
          Save
        </Button>
      </Group>
    </Form>
  )
}