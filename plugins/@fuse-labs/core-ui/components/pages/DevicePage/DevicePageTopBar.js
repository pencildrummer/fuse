import PageTopBar from "../Page/PageTopBar";
import DevicePicker from "./DevicePicker";
import { useDeviceContext, useAppContext } from "@fuse-labs/core-client"
import { Separator, DeviceConnectionStatus } from "../..";
import DevicePageTopBarMenu from "./DevicePageTopBarMenu";
import DeviceStatusList from './DeviceStatusList';

export default function DevicePageTopBar() {

  const { devices } = useAppContext()
  const { device } = useDeviceContext()

  return (
    <PageTopBar>
      <DevicePicker devices={devices} />
      <div className="w-px h-full bg-gray-600" />
      <div className="flex-1 text-xxs font-bold text-gray-400">
        <DeviceStatusList />
      </div>
      <Separator orientation="vertical" />
      <div>
        <DeviceConnectionStatus device={device} />
      </div>
      <Separator orientation="vertical" />
      <div className="relative">
        <DevicePageTopBarMenu />
      </div>
    </PageTopBar>
  )
}