import { useAppContext } from "components/AppProvider/AppProvider";
import DeviceConnectionStatus from "components/DeviceConnectionStatus/DeviceConnectionStatus";
import PageTopBar from "../Page/PageTopBar";
import DevicePicker from "./DevicePicker";

export default function DevicePageTopBar() {

  const { devices } = useAppContext()

  return (
    <PageTopBar>
      <DevicePicker devices={devices} />
      <div className="w-px h-full bg-gray-600" />
      <div className="!mr-auto text-xxs font-bold text-gray-400">
        Status or useful info on real time situation of the device
      </div>
      <div className="w-px h-full bg-gray-600" />
      <div>
        <DeviceConnectionStatus />
      </div>
    </PageTopBar>
  )
}