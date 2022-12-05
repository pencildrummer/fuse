import { useDeviceContext } from "@fuse-labs/core-client";
import { Widget, FormItem, Form, Button, Separator } from "@fuse-labs/core-ui";
import type { FormItemSpec } from "@fuse-labs/core-ui";
import { useEffect, useMemo, useState } from "react";
import lodash from "lodash";
import settings from "./settings";

export default function MarlinSettingsWidget() {
  const { device } = useDeviceContext();

  const [saving, isSaving] = useState(false);

  useEffect(() => {
    device.pluginSockets.fuseLabs.marlinSettings.emit(
      "settings:read",
      device.id,
      (sent) => {
        console.log("NEW SYSTEM - Sent request for Marlin settings", sent);
      }
    );
  }, [device.id, device.pluginSockets.fuseLabs.marlinSettings]);

  // function handleValuesChange(values) {
  //   console.log("Values", values);
  // }

  // function handleValueChange(name, value) {
  //   console.log("Changed value", name, "in", value);
  // }

  async function handleSubmit(values) {
    console.log("Submit", values);
  }

  const initialValues = useMemo(() => {
    return settings.reduce((prev, spec) => {
      lodash.set(prev, spec.name, spec.defaultValue ?? null);
      return prev;
    }, {});
  }, [settings]);

  function renderItems(items: FormItemSpec[]) {
    return items.map((item) => {
      if (item.type == "group") {
        return (
          <>
            {item.label && (
              <div className="col-span-full">
                <div className="text-lg font-medium">{item.label}</div>
              </div>
            )}
            <Separator className="col-span-full my-0" />
            {item.description && (
              <div className="col-span-full text-xs font-normal text-gray-400">
                {item.description}
              </div>
            )}
            <div className="col-span-full grid grid-cols-2 md:grid-cols-3 gap-3">
              {renderItems(item.fields)}
            </div>
            {item.notes && (
              <div className="col-span-full text-xs font-normal py-1.5 px-2 bg-gray-800 text-gray-500 rounded-md">
                {item.notes}
              </div>
            )}
            <Separator className="col-span-full my-0 mb-5" />
          </>
        );
      } else {
        return (
          <FormItem key={item.name} item={item} orientation="horizontal" />
        );
      }
    });
  }

  return (
    <Widget title="Marlin settings">
      <Form
        disabled={saving}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        // onValueChange={handleValueChange}
        // onValuesChange={handleValuesChange}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-3">
          {renderItems(settings)}
        </div>
        <div>
          <Button type="submit">Save settings</Button>
        </div>
      </Form>
    </Widget>
  );
}
