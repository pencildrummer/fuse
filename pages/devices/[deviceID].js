import PrinterDevicePage from "../../components/page-layouts/PrinterDevicePage";
import CameraWidget from "../../plugins/@fuse-labs/camera/components/CameraWidget/CameraWidget";

import ExtruderWidget from "../../plugins/@fuse-labs/marlin-extruder/components/ExtruderWidget/ExtruderWidget";
import MarlinMiscWidget from "../../plugins/@fuse-labs/marlin-extra/components/MarlinMiscWidget/MarlinMiscWidget";
import FeedRateWidget from "../../plugins/@fuse-labs/marlin-move/components/FeedRateWidget/FeedRateWidget";
import MoveWidget from "../../plugins/@fuse-labs/marlin-move/components/MoveWidget/MoveWidget";
import TemperatureWidget from "../../plugins/@fuse-labs/marlin-temperature/components/TemperatureWidget/TemperatureWidget";
import FileManagerWidget from "../../plugins/@fuse-labs/file-manager/components/FileManagerWidget/FileManagerWidget";

import getServerSideDeviceProp from "../../lib/server/getServerSideDeviceProp";

export default function DeviceHomePage({
  device
}) {
	return (
		<PrinterDevicePage device={device}>
			<div className="grid gap-2 grid-cols-3">

				<div className="col-span-3">
					<CameraWidget />
				</div>

				<div className="space-y-2">
          <MoveWidget />
          <FeedRateWidget />
        </div>
        <ExtruderWidget />
        <MarlinMiscWidget />

				<FileManagerWidget />
				
				<div className="col-span-3">
					<TemperatureWidget />
				</div>
      </div>
		</PrinterDevicePage>
	)
}

export async function getServerSideProps(ctx) {
  let device = await getServerSideDeviceProp(ctx)
  if (!device) return { notFound: true }
  return {
    props: {
      device
    }
  }
}