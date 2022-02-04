import { Button, Group, Input, Label, Widget } from "../../../core-ui";

export default function DevicePluginsSettingsWidget() {
  return <Widget title="Plugins">
    <div className="grid grid-cols-2 gap-3">
      <Group className="justify-between">
        <Label>Plugin install directory</Label>
        <Input value="/plugins" disabled />
      </Group>
      <Group>
        <Button size="sm">Install plugin</Button>
      </Group>
    </div>
  </Widget>
}