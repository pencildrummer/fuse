import Link from "next/link";
import { CameraIcon, Link1Icon, LinkBreak1Icon, StarIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import GCodeViewer from "./viewers/GCodeViewer/GCodeViewer";
import { Widget, Progress } from "../../shared";
import { DeviceConnectionStatus, DeviceTypeIcon } from "../index";
import { DeviceProvider } from "@fuse-labs/core-client";

export default function DeviceCard({ device }) {

  const percentage = 0

  // TODO - Remove next dependency, allow for onClick handler?

  return (
    <Link href={`/workspace/devices/${device.id}`} passHref>
      <Widget className={classNames(
        'h-80 cursor-pointer',
        )}>
        <DeviceProvider device={device}>
          <div className="card-body">
            <div className="flex-1 flex flex-col space-y-2">

              <div className="flex flex-col items-stretch font-medium text-sm border-b border-gray-600 pb-0.5">
                <div className="flex flex-row">
                  <div className="flex-1">
                    {device.name}
                  </div>
                  <button>
                    <StarIcon />
                  </button>
                </div>
                <div className="flex flex-row space-x-1 items-center text-[10px] font-mono font-normal dark:text-gray-500">
                  <div>
                    <DeviceTypeIcon device={device} />
                  </div>
                  <div className="flex-1">
                    {device.profile?.brand} {device.profile?.model}
                  </div>
                  <div>
                    <DeviceConnectionStatus device={device} />
                  </div>
                </div>
              </div>
                  
              <div className="text-[11px] font-medium text-gray-500">
                <div className="flex flex-row items-center justify-between">
                  <div>Nome_file.m3f</div>
                  <div>{percentage ?? 0} %</div>
                </div>
                <Progress value={20} max={100} />
              </div>

              {device.camera &&
              <div className="relative w-full h-[160px] rounded-md overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 flex flex-row">
                  {device.camera.live
                  ? <div className="m-1 p-1 bg-gray-900 bg-opacity-75 text-red-700 flex flex-row items-center space-x-1 rounded-sm">
                    <div className="w-1 h-1 rounded-full bg-current" />
                    <span className="text-[10px] font-medium">LIVE</span>
                  </div>
                  : <div className="m-1 p-1 bg-gray-900 bg-opacity-75 text-gray-400 rounded-sm text-[10px] flex flex-row items-center space-x-1">
                    <CameraIcon />
                    <span className="font-mono">15:32:12</span>
                  </div>
                  }
                </div>
              </div>
              }

              {device.type == 'cnc' && <GCodeViewer className="w-full h-[160px] rounded-md overflow-hidden"/>}

            </div>
          </div>
        </DeviceProvider>
      </Widget>
    </Link>
  )
}