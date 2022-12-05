import { InfoCircledIcon } from "@radix-ui/react-icons";
import { List, Button, Group, Label, Popover } from "../../shared";
import { useMemo } from "react";

export default function SerialPortListItem({ port }) {
  const deviceDisplayText = useMemo(() => {
    let text = "Unknown device";
    if (port.manufacturer) {
      text = port.manufacturer;
    } else if (port.vendorId) {
      text = "VENDOR";
      if (port.productId) {
        text = [text, "PRODUCT"].join(" ");
      }
    }
    return text;
  }, [port]);

  return (
    <List.Item>
      <div className="flex-1 flex flex-col">
        <div className="font-bold text-gray-200">{deviceDisplayText}</div>
        <div className="text-xs text-gray-400">{port.path}</div>
      </div>

      <div className="flex items-center">
        <Popover>
          <Popover.Trigger>
            <Button squared>
              <InfoCircledIcon />
            </Button>
          </Popover.Trigger>
          <Popover.Content
            align="end"
            side="bottom"
            sideOffset={5}
            className="min-w-[300px]"
          >
            <List size="compact" className="px-1">
              <List.Item>
                <Group className="w-full justify-between">
                  <Label>Manufacturer</Label>
                  <Label>{port.manufacturer || "-"}</Label>
                </Group>
              </List.Item>

              <List.Item>
                <Group className="w-full justify-between">
                  <Label>Serial number</Label>
                  <Label>{port.serialNumber || "-"}</Label>
                </Group>
              </List.Item>

              <List.Item>
                <Group className="w-full justify-between">
                  <Label>Vendor ID</Label>
                  <Label>{port.vendorId || "-"}</Label>
                </Group>
              </List.Item>

              <List.Item>
                <Group className="w-full justify-between">
                  <Label>Product ID</Label>
                  <Label>{port.productId || "-"}</Label>
                </Group>
              </List.Item>

              <List.Item>
                <Group className="w-full justify-between">
                  <Label>Location ID</Label>
                  <Label>{port.locationId || "-"}</Label>
                </Group>
              </List.Item>

              <List.Item>
                <Group className="w-full justify-between">
                  <Label>PNP ID</Label>
                  <Label>{port.pnpId || "-"}</Label>
                </Group>
              </List.Item>
            </List>
          </Popover.Content>
        </Popover>
      </div>
    </List.Item>
  );
}
