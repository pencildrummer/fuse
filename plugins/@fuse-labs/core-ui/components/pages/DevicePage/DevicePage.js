import React from "react";
import { ScrollArea, MainLayout } from "@fuse-labs/core-ui";
import { DeviceProvider } from "@fuse-labs/core-client";
import DevicePageSidebar from "./DevicePageSidebar";
import DevicePageTopBar from "./DevicePageTopBar";

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