import { useDeviceContext } from "@fuse-labs/core-client";
import { Widget, FormItem, Form, Button, Separator } from "@fuse-labs/core-ui";
import type { FormItemSpec } from "@fuse-labs/core-ui";
import { useEffect, useMemo, useState } from "react";
import lodash from "lodash";
import settings from "./settings";

export default function MarlinSettingsWidget() {
  const { device } = useDeviceContext();

  const [saving, isSaving] = useState(false);

  const [settingsValues, setSettingsValues] = useState();

  useEffect(() => {
    device.pluginSockets.fuseLabs.marlinSettings.emit(
      "settings:read",
      device.id,
      (sent) => {
        console.log("NEW SYSTEM - Sent request for Marlin settings", sent);
      }
    );
  }, [device.id, device.pluginSockets.fuseLabs.marlinSettings]);

  async function handleSubmit(values) {
    console.log("Submit", values);
  }

  // TODO: Maybe export as a standalone fn on aray of FormItemSpec[]
  const initialValues = useMemo(() => {
    return settings.reduce((prev, spec) => {
      lodash.set(prev, spec.name, spec.defaultValue ?? null);
      return prev;
    }, {});
  }, [settings]);

  return (
    <Widget title="Marlin settings">
      <Form
        disabled={!settingsValues || saving}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        items={settings}
        submitTitle={"Save settings"}
        // onValueChange={handleValueChange}
        // onValuesChange={handleValuesChange}
      />
    </Widget>
  );
}
