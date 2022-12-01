import { useDeviceContext } from "@fuse-labs/core-client";
import { Widget, FormItem, Form } from "@fuse-labs/core-ui";
import { useEffect } from "react";

const expectedSettings: FormItemSpec[] = [
  {
    name: "marlin.settings.units",
    type: "select",
    options: [
      { value: "G20", label: "Inches" },
      { value: "G21", label: "Millimeters" },
    ],
  },
  {
    name: "marlin.settings.extruderStepsPerUnit",
    type: "input",
  },
  {
    name: "marlin.settings.xStepsPerUnit",
    type: "input",
  },
  {
    name: "marlin.settings.yStepsPerUnit",
    type: "input",
  },
  {
    name: "marlin.settings.zStepsPerUnit",
    type: "input",
  },
];

export default function MarlinSettingsWidget() {
  const { device } = useDeviceContext();

  useEffect(
    (_) => {
      device.pluginSockets.fuseLabs.marlinSettings.emit(
        "settings:read",
        device.id,
        (sent) => {
          console.log("NEW SYSTEM - Sent request for Marlin settings", sent);
        }
      );
    },
    [device.id, device.pluginSockets.fuseLabs.marlinSettings]
  );

  function handleSettingChange() {}

  return (
    <Widget title="Marlin settings">
      <Form onSubmit={handleSettingChange}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {expectedSettings.map((item) => (
            <FormItem key={item.name} item={item} orientation="horizontal" />
          ))}
        </div>
      </Form>
    </Widget>
  );
}
