import { CopyIcon, InfoCircledIcon, MagnifyingGlassIcon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons"
import { Button, Group, Label, ScrollArea, Separator } from "plugins/@fuse-labs/core-ui"
import { InputRaw } from "plugins/@fuse-labs/core-ui/components/shared/Input/Input"
import CompactList from "plugins/@fuse-labs/core-ui/components/shared/List/CompactList/CompactList"
import { useEffect, useMemo, useState } from "react"
import { useAppContext } from "components/AppProvider/AppProvider"
import Tooltip from "plugins/@fuse-labs/core-ui/components/shared/Tooltip/Tooltip"
import { titleCase } from "lib/shared/strings"
import DeviceProfilePickerTypeFilter from "../DeviceProfilePicker/DeviceProfilePickerTypeFilter"
import classNames from "classnames"

export default function DeviceProfilesList({
  itemComponent = DeviceProfileListItem,
  ...props,
}) {

  const { profiles } = useAppContext()

  const [selectedProfileID, setSelectedProfileID] = useState()

  useEffect(_ => {
    if (props.field?.name && typeof props.form?.setFieldValue === 'function') {
      props.form.setFieldValue(props.field.name, selectedProfileID)
    }
  }, [selectedProfileID])

  const [filters, setFilters] = useState({})
  const filteredProfiles = useMemo(_ => {
    let filtered = {...profiles} // Make copy - TODO: Freeze app context profiles var
    if (filters.type) {
      Object.keys(filtered).map(brand => {
        filtered[brand] = filtered[brand].filter(device => device.type == filters.type)
      })
    }
    return filtered
  }, [profiles, filters])

  const itemsCount = useMemo(_ =>
     Object.keys(filteredProfiles).reduce((count, brand) => count + filteredProfiles[brand].length, 0)
  , [filteredProfiles])

  return (
    <ScrollArea className={classNames('bg-gray-800 rounded-lg overflow-hidden', props.className)}>
      <div className="h-10 px-2 py-1 flex flex-row space-x-2 absolute top-0 inset-x-0 items-center border-b border-gray-700 bg-gray-800/80 rounded-t-lg overflow-hidden">
        <DeviceProfilePickerTypeFilter onChange={type => setFilters(f => ({...f, type: type}))} />
        <Separator orientation="vertical" />
        <MagnifyingGlassIcon className="flex-none"/>
        <InputRaw className="w-full bg-gray-800"/>
        <Separator orientation="vertical" />
        <Button squared size="sm">
          <PlusIcon />
        </Button>
      </div>
      {itemsCount ? (
        <div className="pt-11 px-1">
          <CompactList 
            divide={false} 
            hideEmptyGroups
            items={filteredProfiles} 
            onSelect={(key, value) => setSelectedProfileID(key)}
            selectedItem={selectedProfileID}
            itemComponent={itemComponent}
            maxDepth={1}
            keyTransform={(key, value, isGroup) => isGroup ? key : value.id}
            groupDisplayTransform={group => titleCase(group)} />  
        </div>
      ) : (
        <div className="absolute inset-0 top-10 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-600">
            Empty list
          </span>
        </div>
      )}
    </ScrollArea>
  )
}

function DeviceProfileListItem({
  item,
  ...props
}) {
  return <CompactList.Item selectable {...props} className="group">
    <Group orientation="vertical" className="flex-1">
      <Group className="flex-1">
        <span className="mr-auto">
          {item.model}
        </span>
        <div className="text-gray-500 hover:text-gray-300 transition-colors duration-150">
          <Tooltip content="Copy" size="hint" side="bottom" sideOffset={10} align="start" alignOffset={5}>
            <CopyIcon className="invisible group-hover:visible" />
          </Tooltip>
        </div>
      </Group>
    </Group>
  </CompactList.Item>
}