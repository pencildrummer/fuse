import PrinterDevicePage from "../../components/pages/PrinterDevicePage";
import CameraWidget from "../../plugins/@fuse-labs/camera/components/CameraWidget/CameraWidget";

import ExtruderWidget from "../../plugins/@fuse-labs/marlin-extruder/components/ExtruderWidget/ExtruderWidget";
import MarlinMiscWidget from "../../plugins/@fuse-labs/marlin-misc/components/MarlinMiscWidget/MarlinMiscWidget";
import FeedRateWidget from "../../plugins/@fuse-labs/marlin-move/components/FeedRateWidget/FeedRateWidget";
import MoveWidget from "../../plugins/@fuse-labs/marlin-move/components/MoveWidget/MoveWidget";
import TemperatureWidget from "../../plugins/@fuse-labs/marlin-temp/components/TemperatureWidget/TemperatureWidget";

export default function PrinterPage() {
	return (
		<PrinterDevicePage>
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

				<div className="col-span-3">
					<TemperatureWidget />
				</div>
      </div>
		</PrinterDevicePage>
	)
}