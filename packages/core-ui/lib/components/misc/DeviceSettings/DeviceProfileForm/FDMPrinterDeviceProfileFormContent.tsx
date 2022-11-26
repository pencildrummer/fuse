import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { FieldArray, useFormikContext } from "formik";
import { Group, Input, Label, List, Select, Separator, Button, Checkbox } from "../../../shared";

export default function FDMPrinterDeviceProfileFormContent() {

  const { values } = useFormikContext()

  return (
    <Group orientation="vertical">
      <Group>
        <Label htmlFor="volume.width">X (Width)</Label>
        <Input name="volume.width" type="number"/>
      </Group>
      <Group>
        <Label htmlFor="volume.depth">Y (Depth)</Label>
        <Input name="volume.depth" type="number"/>
      </Group>
      <Group>
        <Label htmlFor="volume.height">Z (Height)</Label>
        <Input name="volume.height" type="number" disabled={values.volume?.formFactor != 'rectangular'}/>
      </Group>
      
      <Group>
        <Label htmlFor="volume.formFactor">Form factor</Label>
        <Select name="volume.formFactor" options={[
          { value: 'rectangular', label: 'Rectangular' },
          { value: 'elliptic', label: 'Elliptic' }
        ]} />
      </Group>

      <Group>
        <Label htmlFor="bed.heated">Heated bed</Label>
        <Checkbox name="bed.heated" />
      </Group>

      <Group>
        <Label htmlFor="volume.origin">Origin</Label>
        <Select name="volume.origin" options={[
          { value: 'lower-left', label: 'Default' },
          { value: 'center', label: 'Center' }
        ]}/>
      </Group>

      <Separator />

      <Group>
        <Label htmlFor="gCodeVersion">GCode version</Label>
        <Select name="gCodeVersion" options={['marlin']}/>
      </Group>

      <Separator />

      <Group>
        <Label htmlFor="xAxis.maxSpeed">Feedrate Max X</Label>
        <Input name="xAxis.maxSpeed" type="number"/>
      </Group>
      <Group>
        <Label htmlFor="yAxis.maxSpeed">Feedrate Max Y</Label>
        <Input name="yAxis.maxSpeed" type="number"/>
      </Group>
      <Group>
        <Label htmlFor="zAxis.maxSpeed">Feedrate Max Z</Label>
        <Input name="zAxis.maxSpeed" type="number"/>
      </Group>

      <Separator />

      <FieldArray name="extruders">{({ push, remove }) => (
        <>
        <Group>
          <Label>
            Extruders
          </Label>
          <Button size="sm" squared onClick={_ => push({ nozzleDiameter: 0.4, xOffset: 0, yOffset: 0 })}>
            <PlusIcon />
          </Button>
        </Group>
        <List className="space-y-2">
          {values?.extruders?.map((extruder, i) => {
            return (
              <List.Item key={`extruder-${i}`} className="group border-dashed border border-gray-700 rounded-md p-2">
                <Group orientation="vertical" className="flex-1">
                  <Group className="border-b border-gray-700 border-dashed pb-2 -mx-2 px-2">
                    <Label>Extruder #{i}</Label>
                    <Button size="xs" squared rounded onClick={_ => remove(i)}
                      className="opacity-0 group-hover:opacity-100 transition duration-150">
                      <Cross2Icon />
                    </Button>
                  </Group>
                  <ExtruderFormContent index={i} />
                </Group>
              </List.Item>
            )
          })}
        </List>
        </>
      )}</FieldArray>
    </Group>
  )
}

function ExtruderFormContent({
  index,
}) {
  return (
    <Group orientation="vertical">
      <Group>
        <Label htmlFor={`extruders[${index}].nozzleDiameter`}>Nozzle diameter</Label>
        <Input name={`extruders[${index}].nozzleDiameter`} type="number"/>
      </Group>
      <Group>
        <Label htmlFor={`extruders[${index}].xOffset`}>X offset</Label>
        <Input name={`extruders[${index}].xOffset`} type="number"/>
      </Group>
      <Group>
        <Label htmlFor={`extruders[${index}].yOffset`}>Y offset</Label>
        <Input name={`extruders[${index}].yOffset`} type="number"/>
      </Group>
    </Group>
  )
}