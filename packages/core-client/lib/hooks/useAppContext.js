import React, { useContext } from "react";

export const AppContext = React.createContext();

export default function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error("useAppContext can only be used inside an AppProvider");
  return ctx;
}
