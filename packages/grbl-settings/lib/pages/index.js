import { useEffect, useMemo, useState } from 'react'
import { useDeviceContext } from '@fuse-labs/core-client'
import { Widget, Button, Loader, Form } from '@fuse-labs/core-ui'
import { TerminalProvider } from '@fuse-labs/terminal/client'

import { SettingField } from '../client'
import GRBLSettingId from '../lib/shared/GRBLSettingId'
import { getSettingFieldType } from '../lib/shared/getSettingFieldType'

function parseSettingMessage(message) {
  let matches = message.match(/\$(?<settingId>[0-9]*)=(?<settingValue>.*)/)
  if (matches) {
    return {
      id: matches.groups.settingId,
      value: parseSettingValue(matches.groups.settingId, matches.groups.settingValue)
    }
  }
  return null
}

function parseSettingValue(settingId, value) {
  let settingType = getSettingFieldType(settingId)
  switch (settingType) {
    case Boolean:
      return Boolean(parseInt(value))
    default:
      return value
  }
}

function convertSettingValue(settingId, value) {
  let settingType = getSettingFieldType(settingId)
  switch (settingType) {
    case Boolean:
      return value ? 1 : 0
    default:
      return value
  }
}

function defaultSettings() {
  let defaults = {}
  for (let setting in GRBLSettingId) {
    if (isNaN(Number(setting))) {
      defaults[setting] = {
        ...defaults[setting],
        value: '',
        disabled: true
      }
    }
  }
  return defaults
}

export default function GRBLSettingsPage() {

  const { device } = useDeviceContext()

  const [settings, setSettings] = useState(defaultSettings())
  const initialValues = useMemo(_ => {
    return Object.keys(settings).reduce((values, key) => ({
      ...values,
      [key]: settings[key].value
    }), {})
  }, [settings])

  function handleReceivedMessage(message) {
    console.log('New message', message)
    if (message.from != 'device') return
    let setting = parseSettingMessage(message.message)
    if (setting) {
      setSettings(settings => ({
          ...settings,
          [GRBLSetting[Number(setting.id)]]: {
            ...settings[ GRBLSetting[Number(setting.id)] ],
            value: setting.value,
            disabled: false
          }
        })
      )
    }
  }

  useEffect(_ => {
    // Connect to device and request settings
    device.terminal.connect(connected => {
      console.log('Connected', connected)
      // Command to receive GRBL settings
    })

    // Request settings
    device.terminal.sendMessage('$$')

    // Configure terminal listener to parse data
    device.terminal.onMessageReceived(handleReceivedMessage)
    return _ => device.terminal.offMessageReceived(handleReceivedMessage)
  }, [device.terminal])

  function handleSubmit(values, formik) {
    // Filter changed values
    let changedValues = Object.keys(values).reduce((changedValues, key) => {
      if (values[key] != initialValues[key]) {
        return {
          ...changedValues,
          [key]: values[key]
        }
      } else {
        return changedValues
      }
    }, {})
    console.log('Submit values', changedValues)
    // Loop through changed settings, disable field and send update request

    // Disabled fields
    setSettings(settings => {
      return Object.keys(changedValues).reduce((settings, key) => {
        let setting = settings[key]
        if (setting) {
          return {
            ...settings,
            [key]: {
              ...setting,
              disabled: true
            }
          }
        } else {
          return settings
        }
      }, settings)
    })

    // Send update request
    Object.keys(changedValues).forEach(key => {
      let settingId = GRBLSetting[key]
      let value = convertSettingValue(settingId, changedValues[key])
      // Change Boolean to Number values
      device.terminal.sendMessage(`$${settingId}=${value}`)
    })
  }

  return (
    <Widget title="GRBL settings">
      <TerminalProvider terminal={device.terminal}>
        {!device.terminal ? <Loader /> : (
          <Form initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-3'>
              {Object.keys(settings).map(settingEnumKey => 
                <SettingField key={settingEnumKey} fieldKey={settingEnumKey}
                  disabled={settings[settingEnumKey].disabled} />
              )}
            </div>
            <div>
              <Button type="submit">Save</Button>
            </div>
          </Form>
        )}
      </TerminalProvider>
    </Widget>
  )
}