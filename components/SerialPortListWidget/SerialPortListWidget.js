import socket from "lib/client/socket";
import { List, Widget } from "plugins/@fuse-labs/core-ui";
import { useEffect, useState } from "react";
import SerialPortListItem from "./SerialPortListItem";

export default function SerialPortListWidget() {

  const [ports, setPorts] = useState([])

  useEffect(_ => {
    // Make socket request to list serial ports
    socket.emit('core.serial.list', null, data => {
      setPorts(data)
    })
  }, [])

  return <Widget title="Connected devices">
    <List>
      {ports?.map(port => (
        <SerialPortListItem key={port.path} port={port} />
      ))}
    </List>
  </Widget>
}