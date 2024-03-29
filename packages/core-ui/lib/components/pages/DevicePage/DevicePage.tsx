import React, { PropsWithChildren, useEffect } from "react";
import { MainLayout } from "../../layouts";
import { ScrollArea } from "../../shared";
import { DeviceProvider, ClientDevice } from "@fuse-labs/core-client";
import DevicePageSidebar from "./DevicePageSidebar";
import DevicePageTopBar from "./DevicePageTopBar";
import DeviceStatusListProvider from "./DeviceStatusListProvider";
import DevicePageStatusHandler from "./DevicePageStatusHandler";

type Props = PropsWithChildren<{
  device: ClientDevice;
}>;

export default function DevicePage({ device, ...props }: Props) {
  if (!device) {
    throw new Error("DevicePage requires a device");
  }

  return (
    <MainLayout>
      <DeviceProvider device={device}>
        <DeviceStatusListProvider>
          <DevicePageStatusHandler />
          <div className="w-full h-full flex flex-col">
            <DevicePageTopBar />

            <div className="flex-1 flex flex-row overflow-hidden">
              <DevicePageSidebar />

              <ScrollArea className="flex-1">
                <div className="p-2 pr-3 flex flex-col space-y-3">
                  {props.children}
                </div>
              </ScrollArea>
            </div>
          </div>
        </DeviceStatusListProvider>
      </DeviceProvider>
    </MainLayout>
  );
}
