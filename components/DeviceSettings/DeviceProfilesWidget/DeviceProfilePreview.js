import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, DisplayGroup, Group, Separator } from "plugins/@fuse-labs/core-ui";
import FDMPrinterIcon from "plugins/@fuse-labs/core-ui/components/icons/FDMPrinterIcon";
import FDMPrinterDeviceProfilePreview from "./FDMPrinterDeviceProfilePreview";

export default function DeviceProfilePreview({
  profile
}) {
  if (!profile) return null
  return (
    <Group orientation="vertical" className="text-sm">
      <div className="flex flex-row items-center space-x-3 border-b border-gray-500 pb-2">
        <div className="flex-none w-[40px] h-[40px] flex items-center justify-center rounded-md bg-gray-600 text-gray-800 p-2">
          <FDMPrinterIcon className="w-full h-full" />
        </div>
        <div className="flex-1 text-xl font-bold flex flex-col">
          <span className="leading-1">{profile.brand} {profile.model}</span>
          <span className="text-sm text-gray-400">{profile.id}</span>
        </div>
        <div className="flex-none">
          <Button squared>
            <Pencil2Icon />
          </Button>
        </div>
      </div>
      <DisplayGroup label="Brand" value={profile.brand}/>
      <DisplayGroup label="Model" value={profile.model} />
      <DisplayGroup label="Device type" value={profile.type} />

      <Separator />

      {profile.type == 'fdm_printer' && <FDMPrinterDeviceProfilePreview profile={profile} />}
      
    </Group>
  )
}