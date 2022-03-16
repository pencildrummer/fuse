import { Button, Dialog, Page, PageTopBar, DevicesGrid, AddDeviceWizard } from "@fuse-labs/core-ui";

export default function Home() {
  return (
    <Page>
      
      <PageTopBar>
        <Dialog title="Add device" content={<AddDeviceWizard />} className="max-w-[400px]">
          <Button size="sm">
            Add new device
          </Button>
        </Dialog>
      </PageTopBar>

      <DevicesGrid />
    
    </Page>
  )
}