import { useSerialPorts } from "@fuse-labs/core-client";
import { List, Widget } from "../../shared";
import SerialPortListItem from "./SerialPortListItem";

export default function SerialPortListWidget() {

  const ports = useSerialPorts()

  return <Widget title="Connected devices">
    <List>
      {ports?.map(port => (
        <SerialPortListItem key={port.path} port={port} />
      ))}
    </List>
  </Widget>
}