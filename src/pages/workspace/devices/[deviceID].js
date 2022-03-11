import { CameraWidget } from '@fuse-labs/camera/client'
import { ExtruderWidget } from '@fuse-labs/marlin-extruder/client'
import { MarlinMiscWidget } from '@fuse-labs/marlin-extra/client'
import { FeedRateWidget } from "@fuse-labs/marlin-move/client";
import { MoveWidget } from "@fuse-labs/marlin-move/client";
import { TemperatureWidget } from "@fuse-labs/marlin-temperature/client";
import { DeviceFileManagerWidget } from "@fuse-labs/file-manager/client";

import { getDevicePageComponent } from "@fuse-labs/core-ui";
import { useRouter } from "next/router";
import { useDevice } from "@fuse-labs/core-client";


export default function DeviceHomePage() {

  const router = useRouter()
  const { query } = router
  const { deviceID } = query

  // Retrieve device with requested ID from the app context
  const device = useDevice(deviceID)

  if (!device) {
    router.replace('/workspace')
    return null
  }
  const DevicePageComponent = getDevicePageComponent(device.profile.type);

	return (
    // TODO - Return correct page based on device type
		<DevicePageComponent device={device}>
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

				<DeviceFileManagerWidget />
				
				<div className="col-span-3">
					<TemperatureWidget />
				</div>
      </div>
		</DevicePageComponent>
	)
}