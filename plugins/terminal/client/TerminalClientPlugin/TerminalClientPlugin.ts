import { ClientDevice, ClientPlugin } from "@fuse-labs/core-client";
import { ReaderIcon } from "@fuse-labs/core-ui";
import { ReactNode } from "react";
import { TerminalCapableClientDevice } from "..";
import ClientTerminal from "../lib/ClientTerminal/ClientTerminal";
import TerminalPage from "../pages";

export default class TerminalClientPlugin extends ClientPlugin {
  get displayName() {
    return "Terminal";
  }

  get icon() {
    return ReaderIcon;
  }

  deviceComponents(device: ClientDevice) {
    return {
      page: {
        plugin: TerminalPage,
      },
    };
  }

  provision() {
    super.provision();

    // Add terminal to devices ( Terminal is just a class helper to send messages through device connection )
    (this.devices as TerminalCapableClientDevice[]).forEach((device) => {
      // Check terminal already exists
      if (device.terminal) {
        console.warn(
          "Trying setting terminal on device but device.terminal already exists"
        );
      } else {
        try {
          device.terminal = new ClientTerminal(device);
          console.log("Added terminal plugin to device", device.name);
        } catch (err) {
          console.error("Error creating terminal for device");
          console.error(err);
        }
      }
    });

    // NOT YET IMPLEMENTED - Cleanup method when deactivating plugin
    return (_) => {
      (this.devices as TerminalCapableClientDevice[]).forEach((device) => {
        if (device.terminal instanceof ClientTerminal) {
          delete device.terminal;
        }
      });
    };
  }
}
