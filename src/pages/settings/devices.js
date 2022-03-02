import { SettingPage, DeviceProfilesWidget, SerialPortListWidget } from "@fuse-labs/core-ui";

export default function DevicesSettingsPage() {
  return (
    <SettingPage>

      <DeviceProfilesWidget />

      <SerialPortListWidget />
    </SettingPage>
  )
}