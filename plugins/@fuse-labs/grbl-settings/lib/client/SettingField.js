import classNames from "classnames"
import { useField } from "formik"
import { Group, Input, Label, Switch } from "plugins/@fuse-labs/core-ui"
import { useEffect } from "react"
import { useIntl } from "react-intl"
import GRBLSettingId from '../shared/GRBLSettingId.ts'
import GRBLSettingKey from '../shared/GRBLSettingKey.ts'
import { getSettingFieldType } from "../shared/settingFieldType"

export default function SettingField({
  fieldKey,
  disabled,
  ...props
}) {

  const { formatMessage } = useIntl()

  const [field, meta, helpers] = useField(fieldKey)
  const { value, initialValue, touched, error } = meta

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
        <Input type="number" id={fieldKey} name={fieldKey} disabled={disabled} className='w-28' />
      )}
    </Group>
  )
}