import BaudRateSelect from "../DeviceSettings/DeviceConnectionWidget/components/BaudRateSelect/BaudRateSelect";
import DeviceProfilePicker from "../DeviceSettings/DeviceProfilePicker/DeviceProfilePicker";
import { Field } from "formik";
import Select from "../../shared/Select/Select";
import {
  Button,
  Group,
  Input,
  Label,
  Separator,
  Form,
  DisplayGroup,
  InputRaw,
} from "../../shared";
import * as Yup from "yup";
import {
  useSerialPorts,
  coreSocket,
  ClientDevice,
} from "@fuse-labs/core-client";
import { getSuggestedName } from "@fuse-labs/shared-utils";
import { Device as CoreDevice } from "@fuse-labs/types";

export default function DeviceForm({
  device,
}: {
  device: CoreDevice.DataType | ClientDevice;
}) {
  const ports = useSerialPorts();

  const initialValues: CoreDevice.DataType = {
    id: device.id,
    name: device.name || getSuggestedName(device?.vendorId, device?.productId),
    profileId: (device as ClientDevice).profile?.id || device.profileId,
    portPath: device?.portPath,
    baudrate: device?.baudrate ?? 0, // 0 is auto baudrate
    serialNumber: device?.serialNumber,
    vendorId: device?.vendorId,
    productId: device?.productId,
  };

  const validationSchema: Yup.SchemaOf<CoreDevice.DataType> = Yup.object({
    id: Yup.string().optional(),
    name: Yup.string().required(),
    profileId: Yup.string().required(),
    portPath: Yup.string().required(),
    baudrate: Yup.number().required(),
    serialNumber: Yup.string().optional(),
    vendorId: Yup.string().optional(),
    productId: Yup.string().optional(),
  });

  function handleSubmit(values, options) {
    console.log("Submit", values);
    if (!device.id) {
      coreSocket.emit("devices:add", values, (deviceData) => {
        console.log("Created device");
      });
    } else {
      coreSocket.emit("devices:update", device.id, values, (deviceData) => {
        console.log("Updated device");
      });
    }
  }

  return (
    <Form<CoreDevice.DataType>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, initialValues, errors, touched, ...formProps }) => (
        <Group orientation="vertical">
          <Input type="hidden" name="id" />

          <Group orientation="vertical">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              className="w-full"
              autoComplete="off"
            />
          </Group>

          <Separator />

          <Group orientation="vertical" className="text-xs">
            <DisplayGroup
              label="Serial number"
              value={values.serialNumber || "-"}
            />
            <DisplayGroup label="Vendor ID" value={values.vendorId || "-"} />
            <DisplayGroup label="Product ID" value={values.productId || "-"} />
          </Group>

          <Separator />

          <Group orientation="vertical">
            <Group className="justify-between">
              <Label htmlFor="profile">Device profile</Label>
              <InputRaw
                name="profileId"
                placeholder="No profile selected"
                className="!bg-transparent !border-dashed !ring-0"
                error={formProps.submitCount && errors.profileId}
                disabled
                value={values.profileId}
              />
            </Group>
            <Field name="profileId" component={DeviceProfilePicker} />
          </Group>
          <Separator />

          <Group orientation="vertical">
            <Group className="justify-between">
              <Label htmlFor="portPath">Port</Label>
              {initialValues.portPath ? (
                <InputRaw
                  name="portPath"
                  value={initialValues.portPath}
                  disabled
                  className="w-max"
                />
              ) : (
                <Select
                  name="portPath"
                  options={ports?.map((p) => p.path)}
                  defaultValue={device?.portPath}
                />
              )}
            </Group>
            <Group className="justify-between">
              <Label htmlFor="baudrate">Baudrate</Label>
              <BaudRateSelect name="baudrate" />
            </Group>
          </Group>

          <Separator />

          <Group className="justify-end">
            <Button type="submit">Save</Button>
          </Group>
        </Group>
      )}
    </Form>
  );
}
