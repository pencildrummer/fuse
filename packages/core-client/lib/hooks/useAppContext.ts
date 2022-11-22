import { ClientDeviceProfile, ConfigDataType } from "@fuse-labs/types";
import React, { useContext } from "react";
import { IntlShape } from "react-intl";
import { ClientDevice, ClientPlugin } from "../models";

interface AppContextInterface {
  isReady: boolean;
  isElectron: () => boolean;
  devices?: ClientDevice[];
  plugins?: ClientPlugin[];
  activePlugins?: ClientPlugin[];
  profiles?: { [x: string]: ClientDeviceProfile[] };
  config?: ConfigDataType;
  intl: IntlShape;
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

export default function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error("useAppContext can only be used inside an AppProvider");
  return ctx;
}
