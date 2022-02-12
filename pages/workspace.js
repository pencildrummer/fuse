import AddDeviceWizard from "components/AddDeviceWizard/AddDeviceWizard";
import Page from "components/page-layouts/Page";
import PageTopBar from "components/page-layouts/Page/PageTopBar";
import { Button, Dialog } from "plugins/@fuse-labs/core-ui";
import DevicesGrid from "../components/DevicesGrid/DevicesGrid";

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