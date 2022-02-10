import AddDeviceWizard from "components/AddDeviceWizard/AddDeviceWizard";
import Page from "components/page-layouts/Page";
import PageTopBar from "components/page-layouts/Page/PageTopBar";
import { Button, Dialog } from "plugins/@fuse-labs/core-ui";
import DevicesGrid from "../components/DevicesGrid/DevicesGrid";
import { getDevices } from "../lib/core/devices";

export default function Home({
  devices
}) {
  return (
    <Page>
      
      <PageTopBar>
        <Dialog title="Add device" content={<AddDeviceWizard />} className="max-w-[400px]">
          <Button size="sm">
            Add new device
          </Button>
        </Dialog>
      </PageTopBar>

      <DevicesGrid devices={devices}/>
    
    </Page>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      devices: getDevices()
    }
  }
}