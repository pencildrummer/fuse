import { Dialog, Widget } from "plugins/@fuse-labs/core-ui";
import { useState } from "react";
import DeviceProfileForm from "../DeviceProfileForm/DeviceProfileForm";
import DeviceProfilesListManager from "../DeviceProfilesListManager/DevicesProfilesListManager";

export default function DeviceProfilesWidget() {

  const [showForm, setShowForm] = useState()

  return (
    <Widget title="Profiles">
      <div className="grid grid-cols-2 gap-2">
        <DeviceProfilesListManager className="h-[400px]" />
        <div className="flex-1">
          Profile preview
        </div>
      </div>
    </Widget>
  )
}