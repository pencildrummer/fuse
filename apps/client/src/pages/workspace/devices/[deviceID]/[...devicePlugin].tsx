//import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import { useDevice, useDevicePlugin } from "@fuse-labs/core-client";
import {
  BlockingView,
  Group,
  InactivePluginView,
  DeviceNotFoundView,
  PluginNotFoundView,
  getDevicePageComponent,
  useDevicePluginComponents,
} from "@fuse-labs/core-ui";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function DevicePluginPage() {
  const router = useRouter();
  const { query } = router;
  const { deviceID, devicePlugin } = query;

  // Retrieve device
  const device = useDevice(deviceID as string);

  const pluginUrl = Array.isArray(devicePlugin)
    ? devicePlugin?.join("/")
    : devicePlugin;
  const plugin = useDevicePlugin(deviceID, pluginUrl);
  const PluginComponent = useDevicePluginComponents(
    device,
    plugin,
    "page.plugin"
  );

  if (!device) {
    console.warn(
      `No device with ID ${deviceID} found. Redirecting to /workspace...`
    );
    return <DeviceNotFoundView />;
  }

  if (!plugin) {
    console.warn(
      `Plugin not found for deviceID '${deviceID}' and pluginUrl '${pluginUrl}'. Redirecting to /workspace...`
    );
    console.log("Device", device);
    return (
      <PluginNotFoundView pluginName={pluginUrl} deviceName={device.name} />
    );
  }

  // Check plugin is active
  if (!plugin.active) {
    console.log("active:", plugin.active.toString());
    return <InactivePluginView />;
  }

  // TODO - Avoid?
  // Check plugin suitable for required device
  if (!plugin.deviceTypes.includes(device.profile.type)) {
    return (
      <BlockingView>
        <Group orientation="vertical" className="items-center">
          <ExclamationTriangleIcon className="w-20 h-20 text-gray-700" />
          <span className="font-bold text-gray-500">
            Plugin do not support device type {device.profile.type}
          </span>
        </Group>
      </BlockingView>
    );
  }

  const DevicePageComponent = getDevicePageComponent(device.profile.type);

  return (
    <DevicePageComponent device={device}>
      <PluginComponent />
    </DevicePageComponent>
  );
}
