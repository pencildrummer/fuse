import { coreSocket } from "../socket";
import { useEffect, useState } from "react";

export default function useSerialPorts() {
  const [ports, setPorts] = useState([]);

  useEffect(() => {
    // Make socket request to list serial ports
    coreSocket.emit("serial:list", (data) => {
      setPorts(data);
    });
  }, []);

  return ports;
}
