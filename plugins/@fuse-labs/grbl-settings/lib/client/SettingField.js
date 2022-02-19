import classNames from "classnames"
import { useField } from "formik"
import { Group, Input, Label } from "plugins/@fuse-labs/core-ui"
import { useEffect } from "react"
import { useIntl } from "react-intl"
import GRBLSetting from '../shared/GRBLSetting.ts'
import GRBLSettingKey from '../shared/GRBLSettingKey.ts'

export default function SettingField({
  fieldKey,
  disabled,
  ...props
}) {

  const { formatMessage } = useIntl()

  const [field, meta, helpers] = useField(fieldKey)
  const { value, initialValue, touched, error } = meta

  return (
    <Group key={`setting-${GRBLSettingKey[fieldKey]}`}>
      <Label htmlFor={fieldKey} className="truncate flex flex-row space-x-1 items-center">
        <div className="flex-none w-8 text-xs text-gray-600 text-right">
          ${GRBLSetting[fieldKey]}
        </div>
        <div className='text-sm truncate'>
          {formatMessage({id: GRBLSettingKey[fieldKey], defaultMessage: GRBLSettingKey[fieldKey]})}
        </div>
      </Label>
      <Input id={fieldKey} name={fieldKey} disabled={disabled} className={classNames(
        'w-28',
        {
          'border-yellow-500 ring-1 ring-yellow-500': touched && !error && value != initialValue
        }
      )} />
    </Group>
  )
}