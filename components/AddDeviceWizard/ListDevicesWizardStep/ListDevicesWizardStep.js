import { CaretRightIcon } from "@radix-ui/react-icons"
import { useAppContext } from "components/AppProvider/AppProvider"
import { usePorts } from "lib/client/ports"
import Table from "plugins/@fuse-labs/core-ui/components/shared/Table/Table"


export default function ListDeviceWizardStep({
  onSelectDevice
}) {

  const ports = usePorts()

  function handleSelectPort(port) {
    // Convert port to device
    let device = port.device || { }
    // Attach port to device
    device.port = port
    // Pass it up
    onSelectDevice?.(device)
  }

  return (
    <>
    <div className="text-gray-500 text-sm font-normal">
      Select the device on the listed ports below. If no device has been automatically detected, you can manually select the port and proceed to the manual configuration.
    </div>
    <Table headers={['Port', 'Vendor', 'Product', null]} className="text-sm">
      {ports?.map(port => <PortRow key={`port-${port.path}`} port={port} onClick={e => handleSelectPort(port)}/>)}
    </Table>
    </>
  )
}

function PortRow({
  port,
  ...props
}) {
  return <Table.Row className="select-none cursor-pointer" {...props}>
    <Table.Data className="text-xs">
      {port.path}
    </Table.Data>
    <Table.Data>
      {port.vendor || 'Unknown'}
    </Table.Data>
    <Table.Data>
      {port.product || 'Unknown'}
    </Table.Data>
    <Table.Data>
      <CaretRightIcon />
    </Table.Data>
  </Table.Row>
}