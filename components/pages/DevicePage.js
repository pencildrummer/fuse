import { CameraIcon, CodeIcon, DashboardIcon, LightningBoltIcon, MixerHorizontalIcon, MoveIcon, ReaderIcon } from "@radix-ui/react-icons";
import ScrollArea from "../../plugins/@fuse-labs/core-ui/components/shared/ScrollArea/ScrollArea";
import MainLayout from "../layouts/MainLayout";
import Menu from "../react-daisyui/Menu/Menu";
import MenuItem from "../react-daisyui/Menu/MenuItem";

export default function DevicePage({
  deviceID,
  ...props
}) {
  return <MainLayout>
    <div className="flex-1 h-full flex flex-row">

      <div className="flex-none dark:bg-gray-900 dark:text-gray-200 w-20 flex flex-col items-center justify-center">
        <Menu className="space-y-10">
          <MenuItem icon={DashboardIcon} href={`/printers/${deviceID}/`} />
          <MenuItem icon={CameraIcon} href={`/printers/${deviceID}/camera`} />
          <MenuItem icon={MoveIcon} href={`/printers/${deviceID}/move`} />
          <MenuItem icon={LightningBoltIcon} href={`/printers/${deviceID}/temperature`} />
          <MenuItem icon={CodeIcon} href={`/printers/${deviceID}/gcode-viewer`} />
          <MenuItem icon={ReaderIcon} href={`/printers/${deviceID}/terminal`} />
          <MenuItem icon={MixerHorizontalIcon} href={`/printers/${deviceID}/config`} />
        </Menu>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 flex flex-col space-y-3">
          {props.children}
        </div>
      </ScrollArea>

    </div>
  </MainLayout>
}