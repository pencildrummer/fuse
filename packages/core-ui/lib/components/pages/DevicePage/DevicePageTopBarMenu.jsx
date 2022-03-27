import { Button, ConfirmDialog, Dialog, DropdownMenu, DeviceForm } from "../../../index";
import { DotsHorizontalIcon, LinkBreak2Icon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDeviceContext, coreSocket } from "@fuse-labs/core-client";

export default function DevicePageTopBarMenu() {

  const { device } = useDeviceContext()
  const [editDevice, setEditDevice] = useState()
  const [removeDevice, setRemoveDevice] = useState()

  function handleDisconnect() {

  }

  function handleEdit() {
    setEditDevice(true)
  }

  function handleDelete() {
    setRemoveDevice(true)
  }

  function handleDeleteConfirm() {
    coreSocket.emit('devices:remove', device.id, (deviceData) => {
      console.log('Removed device')
    })
  }

  return (
    <>
    <DropdownMenu items={[
      {
        label: 'Disconnect',
        icon: LinkBreak2Icon,
      },
      '-',
      {
        label: 'Edit',
        icon: Pencil1Icon,
        action: handleEdit,
      },
      {
        label: 'Remove',
        icon: TrashIcon,
        action: handleDelete,
      }
    ]}>
      <Button size="sm" mode="ghost" squared>
        <DotsHorizontalIcon />
      </Button>
    </DropdownMenu>

    <Dialog content={<DeviceForm device={device} />} open={editDevice} onOpenChange={setEditDevice} />

    <ConfirmDialog open={removeDevice} onOpenChange={setRemoveDevice}
      title="Remove device?"
      content={(<span>Are you sure you want to remove <strong>{device.name}</strong> ?</span>)}
      onConfirm={handleDeleteConfirm} />
    </>
  )
}