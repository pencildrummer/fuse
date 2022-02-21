import { CaretRightIcon } from "@radix-ui/react-icons"
import { usePorts } from "lib/client/ports"
import Table from "plugins/@fuse-labs/core-ui/components/shared/Table/Table"
import { useMemo } from "react"
import getProductInfo from 'lib/shared/devices/getProductInfo'

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
    <Table headers={['Port', 'Info', null]} className="text-sm">
      {ports?.map(port => <PortRow key={`port-${port.path}`} port={port} onClick={e => handleSelectPort(port)}/>)}
    </Table>
    </>
  )
}

function PortRow({
  port,
  ...props
}) {

  const productInfo = useMemo(_ => {
    if (!port.vendorId) return null
    return getProductInfo(port.vendorId, port.productId)
  }, [port.vendorId, port.productId])

  return <Table.Row className="select-none cursor-pointer h-14 max-h-14" {...props}>
    <Table.Data className="w-52">
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{port.manufacturer || '-'}</span>
        <span className="text-xs text-gray-600">{port.path}</span>
      </div>
    </Table.Data>
    <Table.Data className="text-xs">
      <div className="flex flex-col">
        <span>{productInfo?.vendorName || (port.vendorId ? `VID: ${port.vendorId}` : 'Unknown')}</span>
        <span>{productInfo?.productName || (port.productId ? `PID: ${port.productId}` : 'Unknown')}</span>
      </div>
    </Table.Data>
    <Table.Data>
      <CaretRightIcon />
    </Table.Data>
  </Table.Row>
}