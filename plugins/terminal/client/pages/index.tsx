import React from "react";
import { MarlinTerminalWidget, MarlinTerminalSettingsWidget } from "../index";

export default function TerminalPage() {
  return (
    <React.Fragment>
      <MarlinTerminalWidget />
      <MarlinTerminalSettingsWidget />
    </React.Fragment>
  );
}
