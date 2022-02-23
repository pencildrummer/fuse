import { Button, ConfirmDialog, Dialog, DropdownMenu } from "plugins/@fuse-labs/core-ui";
import { DotsHorizontalIcon, LinkBreak2Icon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import DeviceForm from "components/DeviceForm/DeviceForm";
import { useState } from "react";
import { useDeviceContext } from "components/DeviceProvider/DeviceProvider";
import socket from "lib/client/socket";

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
    socket.emit('devices:remove', device.id, (device) => {
      console.log('Removed device')
      console.log(device)
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