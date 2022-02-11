import { InfoCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import BaudRateSelect from "components/DeviceSettings/DeviceConnectionWidget/components/BaudRateSelect/BaudRateSelect";
import DeviceTypeSelect from "components/DeviceSettings/DeviceTypeSelect/DeviceTypeSelect";
import { usePorts } from "lib/client/ports";
import { Button, Group, Input, Label, Select, Separator, Form, ScrollArea, List } from "plugins/@fuse-labs/core-ui";
import CompactList from "plugins/@fuse-labs/core-ui/components/shared/List/CompactList/CompactList";
import CompactListItem from "plugins/@fuse-labs/core-ui/components/shared/List/CompactList/CompactListItem";
import * as Yup from 'yup'

const profiles = {
  "Alfawise": {
    "U30 Pro": {
      setting1: 'valore del setting'
    }
  },
  "Elegoo": {
    "Mars": {
      setting1: 'valore del setting'
    },
    "Mars Pro": {
      setting1: 'valore del setting'
    },
    "Mars 2": {
      setting1: 'valore del setting'
    },
    "Mars 2 Pro": {
      setting1: 'valore del setting'
    }
  }
}

function DeviceProfileListItem({
  item,
  ...props
}) {
  const {
    brand,
    model,
    settings
  } = item
  return <CompactListItem selectable>
    <Group orientation="vertical" className="flex-1">
      <Group className="flex-1">
        <span className="mr-auto">
          {model}
        </span>
        <div>
          <InfoCircledIcon />
        </div>
      </Group>
    </Group>
  </CompactListItem>
}

export default function AddDeviceForm({
  device
}) {

  const ports = usePorts()

  function handleSubmit(values, options) {
    console.log(values)
    console.log(options)
  }
  
  return (
    <Form initialValues={{
      'name': '',
      'type': '',
      'profile': '',
      'port': device?.port.path || '',
      'baudrate': ''
    }} validationSchema={Yup.object({
      name: Yup.string().required(),
      type: Yup.string().required(),
      profile: Yup.string().required(),
      port: Yup.string().required(),
      baudrate: Yup.number().required()
    })} onSubmit={handleSubmit}>
      <Group orientation="vertical">

        <Group orientation="vertical">
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" className="w-full" />
        </Group>

        <Group className="justify-between">
          <Label htmlFor="type">Device type</Label>
          <DeviceTypeSelect name="type" />
        </Group>

        <Group className="justify-between">
          <Label htmlFor="profile">Device profile</Label>
          <Select name="profile" options={['Custom', 'profile printer 1', 'profile printer 2']} />
        </Group>
        
        <Group orientation="vertical">
          <Label htmlFor="profile">Device profile</Label>
          <ScrollArea className="h-[200px] bg-gray-800 rounded-lg overflow-hidden">
            <div className="h-10 flex flex-row space-x-2 absolute top-0 inset-x-0 px-2 items-center border-b border-gray-600/50 bg-gray-800/80 rounded-t-lg overflow-hidden">
              <Input className="w-full"/>
              <MagnifyingGlassIcon className=""/>
            </div>
            <div className="pt-11 px-1">
              <CompactList divide={false}>
                {profiles && Object.keys(profiles).map(brand => {
                  let modelItems = Object.keys(profiles[brand]).map(model => {
                    return {
                      brand,
                      model,
                      ...profiles[brand][model] 
                    }
                  })
                  return <CompactList.Item key={brand} expandable
                    items={modelItems}
                    itemComponent={DeviceProfileListItem}>
                    <span>{brand}</span>
                  </CompactList.Item>
                })}
              </CompactList>
            </div>
          </ScrollArea>
        </Group>
        <Separator />

        <Group orientation="vertical">
          <Group className="justify-between">
            <Label htmlFor="port">
              Port
            </Label>
            <Select name="port" options={ports?.map(p => p.path)} defaultValue={device?.port.path} />
          </Group>
          <Group className="justify-between">
            <Label htmlFor="baudrate">Baudrate</Label>
            <BaudRateSelect name="baudrate" />
          </Group>
        </Group>

        <Separator />

        <Group className="justify-end">
          <Button size="sm" type="submit">
            Save
          </Button>
        </Group>
      </Group>
    </Form>
  )
}