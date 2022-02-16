import DeviceProfilesListManager from "../DeviceProfilesListManager/DevicesProfilesListManager"

export default function DeviceProfilePicker({
  ...props
}) {

  function handleSelect(key, profile) {
    if (props.field?.name && typeof props.form?.setFieldValue === 'function') {
      props.form.setFieldValue(props.field.name, profile.id)
    }
  }

  return <DeviceProfilesListManager onSelect={handleSelect}/>
}