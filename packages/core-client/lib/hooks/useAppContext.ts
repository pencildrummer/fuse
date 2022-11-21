import React, { useContext } from "react";
import { ClientDevice, ClientPlugin } from "../models";

interface AppContextInterface {
  devices: ClientDevice[];
  plugins: ClientPlugin[];
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

export default function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error("useAppContext can only be used inside an AppProvider");
  return ctx;
}
