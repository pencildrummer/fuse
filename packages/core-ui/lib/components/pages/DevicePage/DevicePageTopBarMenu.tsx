import { coreSocket, useDeviceContext } from "@fuse-labs/core-client";
import {
  DotsHorizontalIcon,
  LinkBreak2Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { DeviceForm } from "../../misc";
import { Button, AlertDialog, Dialog, DropdownMenu } from "../../shared";

export default function DevicePageTopBarMenu() {
  const { device } = useDeviceContext();
  const [editDevice, setEditDevice] = useState(false);
  const [removeDevice, setRemoveDevice] = useState(false);

  function handleDisconnect() {}

  function handleEdit() {
    setEditDevice(true);
  }

  function handleDelete() {
    setRemoveDevice(true);
  }

  function handleDeleteConfirm() {
    coreSocket.emit("devices:remove", device.id, (deviceData) => {
      console.log("Removed device");
    });
  }

  return (
    <>
      <DropdownMenu
        items={[
          {
            label: "Disconnect",
            icon: LinkBreak2Icon,
          },
          "-",
          {
            label: "Edit",
            icon: Pencil1Icon,
            action: handleEdit,
          },
          {
            label: "Remove",
            icon: TrashIcon,
            action: handleDelete,
          },
        ]}
      >
        <Button size="sm" mode="ghost" squared>
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenu>

      <Dialog
        title="Edit device"
        content={<DeviceForm device={device} />}
        open={editDevice}
        onOpenChange={setEditDevice}
      />

      <AlertDialog
        open={removeDevice}
        onOpenChange={setRemoveDevice}
        title="Remove device?"
        content={
          <span>
            Are you sure you want to remove <strong>{device.name}</strong> ?
          </span>
        }
        onConfirm={handleDeleteConfirm}
        confirmMode="danger"
      />
    </>
  );
}
