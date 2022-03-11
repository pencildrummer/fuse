import { Group, Input, Label, Switch } from "@fuse-labs/core-ui"
import { useIntl } from "react-intl"
import GRBLSettingId from "../../../lib/shared/GRBLSettingId"
import GRBLSettingKey from "../../../lib/shared/GRBLSettingKey"
import { getSettingFieldType } from "../../../lib/shared/getSettingFieldType"
import getSettingFieldUnit from "../../../lib/shared/getSettingFieldUnit"

export default function SettingField({
  fieldKey,
  disabled,
  ...props
}) {

  const { formatMessage } = useIntl()

  const fieldType = getSettingFieldType(GRBLSettingId[fieldKey])

  return (
    <Group key={`setting-${GRBLSettingKey[fieldKey]}`}>
      <Label htmlFor={fieldKey} className="truncate flex flex-row space-x-1 items-center">
        <div className="flex-none w-8 text-xs text-gray-600 text-right">
          ${GRBLSettingId[fieldKey]}
        </div>
        <div className='text-sm truncate'>
          {formatMessage({id: GRBLSettingKey[fieldKey], defaultMessage: GRBLSettingKey[fieldKey]})}
        </div>
      </Label>
      {fieldType == Boolean && (
        <Switch id={fieldKey} name={fieldKey} disabled={disabled} />
      )}
      {fieldType == Number && (
        <Input type="number" id={fieldKey} name={fieldKey} disabled={disabled} className='w-36'
          detailContent={getSettingFieldUnit(GRBLSettingId[fieldKey])} />
      )}
    </Group>
  )
}