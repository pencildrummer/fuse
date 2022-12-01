import { useDeviceContext } from "@fuse-labs/core-client";
import { Widget, FormItem, Form, Button } from "@fuse-labs/core-ui";
import { useEffect, useMemo } from "react";
import lodash from "lodash";

const expectedSettings: FormItemSpec[] = [
  {
    name: "marlin.settings.units",
    type: "select",
    options: [
      { value: "in", label: "Inches" },
      { value: "mm", label: "Millimeters" },
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

  // function handleValuesChange(values) {
  //   console.log("Values", values);
  // }

  // function handleValueChange(name, value) {
  //   console.log("Changed value", name, "in", value);
  // }

  function handleSubmit(values) {
    console.log("Submit", values);
  }

  const initialValues = useMemo(() => {
    return expectedSettings.reduce((prev, spec) => {
      lodash.set(prev, spec.name, spec.defaultValue ?? null);
      return prev;
    }, {});
  }, [expectedSettings]);

  return (
    <Widget title="Marlin settings">
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        // onValueChange={handleValueChange}
        // onValuesChange={handleValuesChange}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {expectedSettings.map((item) => (
            <FormItem key={item.name} item={item} orientation="horizontal" />
          ))}
        </div>
        <div>
          <Button type="submit">Save settings</Button>
        </div>
      </Form>
    </Widget>
  );
}
