import { useAppContext } from "components/AppProvider/AppProvider";
import DeviceConnectionStatus from "components/DeviceConnectionStatus/DeviceConnectionStatus";
import DevicePicker from "./DevicePicker";

export default function DevicePageTopBar() {

  const { devices } = useAppContext()

  return (
    <div className="flex flex-row space-x-2 items-center text-gray-50 font-medium text-sm mx-1.5 px-1.5 py-2 border-b border-gray-700">
      <DevicePicker devices={devices} />
      <div className="w-px h-full bg-gray-600" />
      <div className="!mr-auto text-xxs font-bold text-gray-400">
        Status or useful info on real time situation of the device
      </div>
      <div className="w-px h-full bg-gray-600" />
      <div>
        <DeviceConnectionStatus />
      </div>
    </div>
  )
}