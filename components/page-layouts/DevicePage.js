import * as icons from "@radix-ui/react-icons";
import React from "react";
import ScrollArea from "../../plugins/@fuse-labs/core-ui/components/shared/ScrollArea/ScrollArea";
import Tooltip from "../../plugins/@fuse-labs/core-ui/components/shared/Tooltip/Tooltip";
import DeviceProvider from "../DeviceProvider/DeviceProvider";
import MainLayout from "../layouts/MainLayout";
import DevicePageSidebar from "./DevicePage/DevicePageSidebar";
import DevicePageTopBar from "./DevicePage/DevicePageTopBar";

export default function DevicePage({
  device,
  ...props
}) {

  if (!device) {
    throw new Error('DevicePage requires a device')
  }

  return <MainLayout>
    <DeviceProvider device={device}>
      <div className="w-full h-full flex flex-col">
        <DevicePageTopBar device={device} />

        <div className="flex-1 flex flex-row overflow-hidden">

          <DevicePageSidebar />
              
          <ScrollArea className="flex-1">
            <div className="p-2 pr-3 flex flex-col space-y-3">
              {props.children}
            </div>
          </ScrollArea>

        </div>
      </div>
    </DeviceProvider>
  </MainLayout>
}