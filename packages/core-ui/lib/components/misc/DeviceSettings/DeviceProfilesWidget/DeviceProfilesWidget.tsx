import { Widget } from "../../../shared";
import { useState } from "react";
import DeviceProfilesListManager from "../DeviceProfilesListManager/DevicesProfilesListManager";
import DeviceProfilePreview from "./DeviceProfilePreview";

export default function DeviceProfilesWidget() {

  const [selectedProfile, setSelectedProfile] = useState()

  return (
    <Widget title="Profiles">
      <div className="grid grid-cols-2 gap-2">
        <DeviceProfilesListManager className="h-[400px]"
          onSelect={(k, profile) => setSelectedProfile(profile)}/>
        <div className="flex-1">
          <DeviceProfilePreview profile={selectedProfile} />
        </div>
      </div>
    </Widget>
  )
}