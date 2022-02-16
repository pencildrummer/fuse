import { InfoCircledIcon } from "@radix-ui/react-icons";
import { titleCase } from "lib/shared/strings";
import { Group } from "plugins/@fuse-labs/core-ui";
import CompactList from "plugins/@fuse-labs/core-ui/components/shared/List/CompactList/CompactList";
import Tooltip from "plugins/@fuse-labs/core-ui/components/shared/Tooltip/Tooltip";

export default function DeviceProfileList({
  itemComponent = DeviceProfileListItem,
  ...props
}) {
  return (
    <CompactList 
      divide={false} 
      hideEmptyGroups
      //items={filteredProfiles} 
      //onSelect={(key, value) => setSelectedProfileID(key)}
      //selectedItem={selectedProfileID}
      itemComponent={itemComponent}
      maxDepth={1}
      keyTransform={(key, value, isGroup) => isGroup ? key : value.id}
      groupDisplayTransform={group => titleCase(group)}
      {...props} />
  )
}

function DeviceProfileListItem({
  item,
  ...props
}) {
  return <CompactList.Item selectable {...props}>
    <Group orientation="vertical" className="flex-1">
      <Group className="flex-1">
        <span className="mr-auto">
          {item.model}
        </span>
        <div className="text-gray-500 hover:text-gray-300 transition-colors duration-150">
          <Tooltip content={<DeviceProfileTooltipContent profile={item} />}
            side="right" sideOffset={10} align="center" showArrow>
            <InfoCircledIcon />
          </Tooltip>
        </div>
      </Group>
    </Group>
  </CompactList.Item>
}

function DeviceProfileTooltipContent({
  profile
}) {

  let infos = useMemo(_ => {
    switch(profile.type) {
      case 'fdm_printer':
        return {
          'Max speed': profile.max_speed,
          'Printing volume': [profile.volume.width, profile.volume.height, profile.volume.depth].filter(Boolean).join('x'),
          'Extrudes': profile.extruders
        }
      case 'msla_printer':
        return {
          'Printing volume': [profile.volume.width, profile.volume.height, profile.volume.depth].filter(Boolean).join('x'),
        }
      case 'cnc':
        return {
          'Max speed': profile.max_speed,
          'Volume': [profile.volume.width, profile.volume.height, profile.volume.depth].filter(Boolean).join('x'),
        }
    }
  }, [profile])

  return (
    <Group orientation="vertical" className="w-full min-w-[200px]">
      {Object.keys(infos)?.map((key) => (
        <Group key={`info-${key}`} className="justify-between">
          <Label><span className="text-gray-400">{key}</span></Label>
          <span className="font-semibold">{infos[key] || '-'}</span>
        </Group>
      ))}
    </Group>
  )
}