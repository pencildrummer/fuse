export * from "./components/index";
import { ClientDevice } from "@fuse-labs/core-client";
import { ClientTerminal } from "./lib";

export interface TerminalCapableClientDevice extends ClientDevice {
  terminal: ClientTerminal;
}

import TerminalClientPlugin from "./TerminalClientPlugin/TerminalClientPlugin";
export default TerminalClientPlugin;
