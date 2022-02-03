import { Group, Label, Select, Separator, Input, Button } from "../../../core-ui/";

export default function PrinterProfileForm({
  ...props
}) {
  return <form className="grid grid-cols-2 gap-3">
    <Group>
      <Label htmlFor="brand">Brand</Label>
      <Input id="brand" />
    </Group>
    <Group>
      <Label htmlFor="model">Model</Label>
      <Input id="model" />
    </Group>

    <Group>
      <Label htmlFor="form-factor">Form factor</Label>
      <Select id="form-factor" options={['rectangular', 'circular']} />
    </Group>
    <Group>
      <Label htmlFor="origin">Origin</Label>
      <Select id="origin" options={['lower-left', 'center']} />
    </Group>

    <Group className="col-span-2">
      <Label htmlFor="heated-bed">Heated bed</Label>
      <Select id="heated-bed" options={['yes', 'add-on']} />
    </Group>

    <Group orientation="vertical">
      <Label>Printing volume</Label>
      <Separator />
      <Group>
        <Label htmlFor="width">Width</Label>
        <Input id="width" />
      </Group>
      <Group>
        <Label htmlFor="height">Height</Label>
        <Input id="height" />
      </Group>
      <Group>
        <Label htmlFor="depth">Depth</Label>
        <Input id="depth" />
      </Group>
    </Group>

    <div className="col-span-2">
      <Group className="justify-end">
        <Button>
          Save
        </Button>
      </Group>
    </div>
  </form>
}