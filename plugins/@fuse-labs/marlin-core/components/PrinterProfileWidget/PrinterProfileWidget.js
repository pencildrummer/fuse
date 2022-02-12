import { SelectRaw } from "plugins/@fuse-labs/core-ui/components/shared/Select/Select";
import { Button, Dialog, Group, Separator, Widget } from "../../../core-ui";
import SettingsWidget from "../../../core-ui/components/SettingsWidget/SettingsWidget";
import PrinterProfileForm from "../PrinterProfileForm/PrinterProfileForm";

export default function PrinterProfileWidget({
  ...props
}) {
  const profiles = [
    { value: 'crl-ender-3', label: 'Creality Ender 3' },
    { value: 'lng-lk4', label: 'Longer LK4' },
    { value: 'lng-lk4-pro', label: 'Longer LK4 Pro' },
  ]

  return <Widget title="Printer">
    <Group>
      <SelectRaw id="profile" options={profiles} />
      <Button size="sm">
        Save
      </Button>

      <Separator orientation="vertical" />

      <Dialog>
        <Dialog.Trigger>
          <Button size="sm">
            New profile
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <PrinterProfileForm />
        </Dialog.Content>
      </Dialog>
    </Group>
  </Widget>
}