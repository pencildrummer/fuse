import Tooltip from "../../shared/Tooltip/Tooltip";
import Loader from "../../shared/Loader/Loader";
import {
  Link1Icon,
  LinkBreak1Icon,
  LinkNone1Icon,
} from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";
import { coreSocket } from "@fuse-labs/core-client";

type ConnectionStatus =
  | "loading"
  | "portNotFound"
  | "differentDevice"
  | "connected";

export default function DeviceConnectionStatus({ device }) {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("loading");

  useEffect(() => {
    coreSocket.emit("devices:connection:check", device.id, (port) => {
      if (port) {
        if (
          port.serialNumber == device.serialNumber &&
          port.vendorId == device.vendorId &&
          port.productId == device.productId
        ) {
          setConnectionStatus("connected");
        } else {
          setConnectionStatus("differentDevice");
        }
      } else {
        setConnectionStatus("portNotFound");
      }
    });
  }, [device]);

  const tooltipContent = useMemo(() => {
    switch (connectionStatus) {
      case "loading":
        return <span>Checking connection...</span>;
      case "portNotFound":
        return (
          <span className="text-red-300">Port {device.port} not found</span>
        );
      case "differentDevice":
        return (
          <span className="text-yellow-600">
            A different device is connected to port {device.port}
          </span>
        );
      case "connected":
        return (
          <span className="text-lime-500">
            Device connected on {device.port}
          </span>
        );
    }
  }, [connectionStatus, device.port]);

  return (
    <Tooltip
      content={tooltipContent}
      size="sm"
      className="font-normal"
      side="left"
      sideOffset={18}
      alignOffset={0}
    >
      <div>
        {connectionStatus == "loading" && <Loader />}
        {connectionStatus == "portNotFound" && (
          <LinkBreak1Icon className="text-red-600" />
        )}
        {connectionStatus == "differentDevice" && (
          <LinkNone1Icon className="text-yellow-600" />
        )}
        {connectionStatus == "connected" && (
          <Link1Icon className="text-lime-600" />
        )}
      </div>
    </Tooltip>
  );
}
