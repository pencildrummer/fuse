import { CopyIcon, Cross1Icon, Cross2Icon, CrossCircledIcon, InfoCircledIcon, MagnifyingGlassIcon, Pencil2Icon, PlusCircledIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { Button, ConfirmDialog, Dialog, Group, Label, ScrollArea, Separator } from "plugins/@fuse-labs/core-ui"
import { InputRaw } from "plugins/@fuse-labs/core-ui/components/shared/Input/Input"
import CompactList from "plugins/@fuse-labs/core-ui/components/shared/List/CompactList/CompactList"
import { useEffect, useMemo, useState } from "react"
import { useAppContext } from "components/AppProvider/AppProvider"
import Tooltip from "plugins/@fuse-labs/core-ui/components/shared/Tooltip/Tooltip"
import DeviceProfilePickerTypeFilter from "../DeviceProfilePicker/DeviceProfilePickerTypeFilter"
import classNames from "classnames"
import DeviceProfileList from "../DeviceProfileList/DeviceProfileList"
import DeviceProfileForm from "../DeviceProfileForm/DeviceProfileForm"
import socket from "lib/client/socket"

export default function DeviceProfilesListManager({
  ...props,
}) {

  const { profiles } = useAppContext()

  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({})

  const groupedProfiles = useMemo(_ => {
    return Object.keys(profiles).reduce((grouped, profileId) => {
      let profile = profiles[profileId]
      let brand = profile.brand || 'Generic'
      if (!grouped[brand])
        grouped[brand] = []
      grouped[brand].push(profile)
      return grouped
    }, {})
  }, [profiles])

  const filteredProfiles = useMemo(_ => {
    let filtered = {...groupedProfiles} // Make copy - TODO: Freeze app context profiles var
    // Filter by type
    if (filters.type) {
      Object.keys(filtered).map(brand => {
        filtered[brand] = filtered[brand].filter(device => device.type == filters.type)
      })
    }
    // Filter by query
    if (query?.length) {
      let regex = new RegExp(`.?(${query}).?`, 'i')
      Object.keys(filtered).map(brand => {
        filtered[brand] = filtered[brand].filter(device => regex.test(device.model))
      })
    }
    return filtered
  }, [groupedProfiles, filters, query])

  const itemsCount = useMemo(_ =>
     Object.keys(filteredProfiles).reduce((count, brand) => count + filteredProfiles[brand].length, 0)
  , [filteredProfiles])

  // Item action handlers

  const [showForm, setShowForm] = useState()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState()
  const [editingProfile, setEditingProfile] = useState()
  const [deletingProfile, setDeletingProfile] = useState()

  function handleEditItem(item) {
    console.log('Edit', item)
    setEditingProfile(item)
    setShowForm(true)
  }

  function handleDeleteItem(item) {
    console.log('Delete', item)
    setDeletingProfile(item)
    setShowDeleteConfirm(true)
  }

  function handleConfirmDelete() {
    console.log('Should delete')
    socket.emit('profiles:delete', deletingProfile.id, (profile) => {
      console.log('Deleted profile', profile)
    })
  }

  return (
    <>
    <ScrollArea className={classNames('bg-gray-800 rounded-lg overflow-hidden', props.className)}>
      <div className="h-10 px-2 py-1 flex flex-row space-x-2 absolute top-0 inset-x-0 items-center border-b border-gray-700 bg-gray-800/80 rounded-t-lg overflow-hidden">
        <DeviceProfilePickerTypeFilter onChange={type => setFilters(f => ({...f, type: type}))} />
        <Separator orientation="vertical" />

        <MagnifyingGlassIcon className="flex-none"/>
        <div className="relative flex items-center">
          <InputRaw className={classNames(
            'w-full bg-gray-800',
            {
              '!pr-[22px]': query?.length
            }
          )} placeholder="Search model..." value={query} onChange={e => setQuery(e.target.value)}/>
          {Boolean(query?.length) && <div className="absolute right-0 inset-y-0 px-1 flex items-center">
            <div className=" bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition-colors duration-150"
              onClick={_ => setQuery('')}>
              <Cross2Icon className="scale-75"/>
            </div>
          </div>}
        </div>          
        
        <Separator orientation="vertical" />
        
        <Tooltip size="hint" content="Add profile">
          <Button squared size="sm" onClick={_ => {
            setEditingProfile(undefined)
            setShowForm(true)
          }}>
            <PlusIcon />
          </Button>
        </Tooltip>

      </div>

      {itemsCount ? (
        <div className="pt-11 px-1">
          <DeviceProfileList 
            items={filteredProfiles} 
            itemComponent={DeviceProfileListItem}
            itemOnEdit={handleEditItem}
            itemOnDelete={handleDeleteItem}
            {...props} />  
        </div>
      ) : (
        <div className="absolute inset-0 top-10 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-600">
            No profiles
          </span>
        </div>
      )}
    </ScrollArea>

    <Dialog.Root open={showForm} onOpenChange={setShowForm}>
      <Dialog.Content title="Device profile">
        <ScrollArea className="h-full">
          <DeviceProfileForm profile={editingProfile}/>
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>

    <ConfirmDialog.Root open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
      <ConfirmDialog.Content title="Delete profile" onConfirm={handleConfirmDelete}>
        <span className="font-medium">
          Are you sure you want do delete <span className="font-bold text-blue-500">{deletingProfile?.id}</span> profile?
        </span>
      </ConfirmDialog.Content>
    </ConfirmDialog.Root>
    </>
  )
}

function DeviceProfileListItem({
  item,
  onEdit,
  onDelete,
  ...props
}) {

  function handleDeleteClick(e) {
    e.preventDefault()
    e.stopPropagation()
    onDelete?.(item)
  }

  return <CompactList.Item selectable {...props} className="group">
    <Group orientation="vertical" className="flex-1">
      <Group className="flex-1">
        <span className="mr-auto">
          {item.model}
        </span>
        <div className="flex flex-row items-center space-x-1 text-gray-500 hover:text-gray-300 transition-colors duration-150">
          <Tooltip content="Edit" size="hint" >
            <Pencil2Icon className="invisible group-hover:visible" onClick={_ => onEdit?.(item)} />
          </Tooltip>

          <Tooltip content="Delete" size="hint" >
            <TrashIcon className="invisible group-hover:visible" onClick={handleDeleteClick} />
          </Tooltip>
        </div>
      </Group>
    </Group>
  </CompactList.Item>
}