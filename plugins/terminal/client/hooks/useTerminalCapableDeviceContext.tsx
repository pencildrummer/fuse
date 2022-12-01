import { TerminalCapableClientDevice } from "..";
import { useDeviceContext } from "@fuse-labs/core-client";

export function useTerminalCapableDeviceContext() {
  const ctx = useDeviceContext<TerminalCapableClientDevice>();
  return ctx;
}
