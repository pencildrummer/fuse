import { useEffect, useMemo, useState } from "react";
import { coreSocket } from "../socket";
import { pathCase } from "@fuse-labs/shared-utils";
import { Device } from "@fuse-labs/types";
import { profile } from "console";

type ClientDeviceProfilesMap = {
  [key: string]: Device.Profile.BaseInterface;
};

export default function useProviderProfiles(data: ClientDeviceProfilesMap) {
  const [profiles, setProfiles] = useState<ClientDeviceProfilesMap | null>();

  useEffect(() => {
    setProfiles(data);
  }, [data]);

  useEffect(() => {
    /**
     * Profiles
     */
    coreSocket.on("profiles:added", (profile: Device.Profile.BaseInterface) => {
      // Add received new profile to in memory ones
      /*const brand = pathCase(profile.brand);
      setProfiles((profiles) => {
        let newProfiles = { ...profiles };
        newProfiles[brand] = newProfiles[brand] || [];
        newProfiles[brand].push(profile);
        return newProfiles;
      });*/

      setProfiles((prev) => ({ ...prev, [profile.id]: profile }));
    });

    coreSocket.on(
      "profiles:updated",
      (profile: Device.Profile.BaseInterface) => {
        // Updated received profile to in memory ones
        // setProfiles((profiles) => {
        //   let brand = pathCase(profile.brand);
        //   let editIndex = profiles[brand].findIndex((p) => p.id == profile.id);
        //   if (editIndex == -1) {
        //     console.error(
        //       "Unable to find index for received updated profile with id",
        //       profile.id
        //     );
        //     return profiles;
        //   }
        //   // Replace received profile with old one
        //   let updatedProfiles = { ...profiles };
        //   updatedProfiles[brand].splice(editIndex, 1, profile);
        //   return updatedProfiles;
        // });
        setProfiles((prev) => ({ ...prev, [profile.id]: profile }));
      }
    );

    coreSocket.on(
      "profiles:deleted",
      (profileId: Device.Profile.BaseInterface["id"]) => {
        // Remove deleted profiles form the in memory ones
        // setProfiles((profiles) => {
        //   let keyPath = id.split(".");
        //   let brand = pathCase(keyPath[0]);
        //   let model = pathCase(keyPath[1]);
        //   if (profiles[brand]) {
        //     let updateProfiles = { ...profiles };
        //     updateProfiles[brand] = updateProfiles[brand].filter(
        //       (p) => p.id != id
        //     );
        //     return updateProfiles;
        //   } else {
        //     console.warn(
        //       'Received deleted profile event for profile "' +
        //         id +
        //         '" but profile is not found'
        //     );
        //     return profiles;
        //   }
        // });
        setProfiles((prev) => {
          let profiles = { ...prev };
          delete profiles[profileId];
          return profiles;
        });
      }
    );
  }, []);

  return profiles;
}
