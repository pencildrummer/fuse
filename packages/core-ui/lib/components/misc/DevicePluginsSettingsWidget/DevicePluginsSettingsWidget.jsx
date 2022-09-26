import { useAppContext } from "@fuse-labs/core-client";
import { Button, Group, InputRaw, Label, Widget } from '../../index.js'

export default function DevicePluginsSettingsWidget() {

  const { config } = useAppContext()

  return <Widget title="Plugins">
    <div className="grid grid-cols-2 gap-3">
      <Group className="justify-between">
        <Label>Plugin install directory</Label>
        <InputRaw value={config.pluginsDirectory} disabled />
      </Group>
      <Group>
        <Group orientation="vertical">
          <Label>Install plugin manually</Label>
          <p className="text-xs">Manually install a plugin from .fsx file or source</p>
        </Group>
        <Button size="sm">Install plugin</Button>
      </Group>
    </div>
  </Widget>
}