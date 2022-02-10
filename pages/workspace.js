import Page from "components/page-layouts/Page";
import PageTopBar from "components/page-layouts/Page/PageTopBar";
import { Button } from "plugins/@fuse-labs/core-ui";
import DevicesGrid from "../components/DevicesGrid/DevicesGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getDevices } from "../lib/core/devices";

export default function Home({
  devices
}) {
  return (
    <Page>
      
      <PageTopBar>
        <Button size="sm">
          Add new device
        </Button>
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