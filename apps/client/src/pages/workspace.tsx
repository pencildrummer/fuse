import React, { useState } from "react";
import {
  Button,
  Dialog,
  Page,
  PageTopBar,
  DevicesGrid,
  AddDeviceWizard,
} from "@fuse-labs/core-ui";

export default function Home() {
  return (
    <Page>
      <PageTopBar>
        <AddDeviceWizardButton />
      </PageTopBar>

      <DevicesGrid />
    </Page>
  );
}

function AddDeviceWizardButton() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title="Add device"
      content={<AddDeviceWizard onComplete={() => setOpen(false)} />}
      className="max-w-[400px]"
    >
      <Button size="sm">Add new device</Button>
    </Dialog>
  );
}
