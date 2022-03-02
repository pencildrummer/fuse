import { Group, Input, Label, Select, Separator, Switch } from "@fuse-labs/core-ui";
import Checkbox from "@fuse-labs/core-ui/components/shared/Checkbox/Checkbox";

export default function MSLAPrinterDeviceProfileFormContent() {
  return (
    <Group orientation="vertical">
      <Group>
        <Label>X (Width)</Label>
        <Input name="width" type="number"/>
      </Group>
      <Group>
        <Label>Y (Depth)</Label>
        <Input name="depth" type="number"/>
      </Group>
      <Group>
        <Label>Z (Height)</Label>
        <Input name="height" type="number"/>
      </Group>

    </Group>
  )
}