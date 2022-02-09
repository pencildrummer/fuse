import DevicesGrid from "../components/DevicesGrid/DevicesGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getDevices } from "../lib/core/devices";

export default function Home({
  devices
}) {
  return (
    <MainLayout>

      <DevicesGrid devices={devices}/>
    
    </MainLayout>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      devices: getDevices()
    }
  }
}