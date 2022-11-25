import {
  AppDataType,
  ClientDeviceProfile,
  ConfigDataType,
} from "@fuse-labs/types";
import React, { useContext } from "react";
import { IntlShape } from "react-intl";
import AppError from "../errors/AppError";
import { ClientDevice, ClientPlugin } from "../models";

interface AppContextInterface {
  connected: boolean;
  connecting: boolean;
  loading: boolean;
  ready: boolean;
  isElectron: () => boolean;
  devices?: ClientDevice[];
  plugins?: ClientPlugin[];
  activePlugins?: ClientPlugin[];
  profiles?: { [x: string]: ClientDeviceProfile[] };
  config?: ConfigDataType;
  intl: IntlShape;

  connect: () => void;
  requestAppData: () => Promise<AppDataType | AppError>;
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

export default function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error("useAppContext can only be used inside an AppProvider");
  return ctx;
}
