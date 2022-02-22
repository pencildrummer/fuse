import { Button, Dialog, DropdownMenu } from "plugins/@fuse-labs/core-ui";
import { DotsHorizontalIcon, LinkBreak2Icon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import DeviceForm from "components/DeviceForm/DeviceForm";
import { useState } from "react";
import { useDeviceContext } from "components/DeviceProvider/DeviceProvider";

export default function DevicePageTopBarMenu() {

  const { device } = useDeviceContext()
  const [editDevice, setEditDevice] = useState()

  function handleDisconnect() {

  }

  function handleEdit() {
    setEditDevice(true)
  }

  function handleDelete() {

  }

  return (
    <>
    <DropdownMenu items={[
      {
        label: 'Disconnect',
        icon: LinkBreak2Icon,
        action: handleDisconnect
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
    </>
  )
}