import { useDeviceContext } from 'components/DeviceProvider/DeviceProvider'
import { Form, Group, Label, Loader, Widget, Input, Button } from 'plugins/@fuse-labs/core-ui'
import TerminalProvider from 'plugins/@fuse-labs/marlin-terminal/components/MarlinTerminalWidget/TerminalProvider'
import { useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import SettingField from '../lib/client/SettingField'

import GRBLSetting from '../lib/shared/GRBLSetting.ts'
import GRBLSettingKey from '../lib/shared/GRBLSettingKey.ts'

function parseSettingMessage(message) {
  let matches = message.match(/\$(?<settingId>[0-9]*)=(?<settingValue>.*)/)
  if (matches) {
    return {
      id: matches.groups.settingId,
      value: matches.groups.settingValue
    }
  }
  return null
}

function defaultSettings() {
  let defaults = {}
  for (let setting in GRBLSetting) {
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

  const { device, terminal } = useDeviceContext()

  const [settings, setSettings] = useState(defaultSettings())
  const initialValues = useMemo(_ => {
    return Object.keys(settings).reduce((values, key) => ({
      ...values,
      [key]: settings[key].value
    }), {})
  }, [settings])

  function handleReceivedMessage(message) {
    if (message.from != 'device') return
    console.log('New message from device', message.message)
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
    terminal.connect(connected => {
      if (!connected)
      console.log('Connected')
      // Command to receive GRBL settings
    })

    // Request settings
    terminal.sendMessage('$$')

    // Configure terminal listener to parse data
    terminal.onMessageReceived(handleReceivedMessage)
    return _ => terminal.offMessageReceived(handleReceivedMessage)
  }, [terminal])

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
      let GRBLId = GRBLSetting[key]
      let value = changedValues[key]
      terminal.sendMessage(`$${GRBLId}=${value}`)
    })
  }

  return (
    <Widget title="GRBL settings">
      <TerminalProvider terminal={terminal}>
        {!terminal ? <Loader /> : (
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