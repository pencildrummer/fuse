import { useDeviceContext } from 'components/DeviceProvider/DeviceProvider'
import { DisplayLabel, DisplayValue, Group, Label, Loader, Widget } from 'plugins/@fuse-labs/core-ui'
import { InputRaw } from 'plugins/@fuse-labs/core-ui/components/shared/Input/Input'
import TerminalProvider from 'plugins/@fuse-labs/marlin-terminal/components/MarlinTerminalWidget/TerminalProvider'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

function parseSettingMessage(message) {
  let matches = message.match(/\$(?<settingKey>[0-9]*)=(?<settingValue>.*)/)
  if (matches) {
    return {
      key: matches.groups.settingKey,
      value: matches.groups.settingValue
    }
  }
  return null
}

export default function GRBLSettingsPage() {

  const { device, terminal } = useDeviceContext()

  const { formatMessage } = useIntl()
  const [settings, setSettings] = useState({})

  useEffect(_ => {
    // Configure terminal listener to parse data
    let listener = message => {
      if (message.from != 'device') return
      console.log('New message from device', message.message)
      let setting = parseSettingMessage(message.message)
      if (setting) {
        setSettings(settings => ({
            ...settings,
            [setting.key]: setting.value
          })
        )
      }
    }
    terminal.onMessageReceived(listener)

    // Connect to device and request settings
    terminal.connect(connected => {
      if (!connected)
      console.log('Sending terminal request')
      // Command to receive GRBL settings
    })

    terminal.sendMessage('$$')

    return _ => terminal.offMessageReceived(listener)
  }, [terminal])

  return (
    <Widget title="GRBL settings">
      <TerminalProvider terminal={terminal}>
        {!terminal ? <Loader /> : (
          <div className='grid grid-cols-2 gap-3'>
            {
              Object.keys(settings).map(key => (
                <Group key={`setting-${key}`}>
                  <Label className="truncate flex flex-row space-x-1 items-center">
                    <div className="flex-none w-8 text-xs text-gray-600 text-right">${key}</div>
                    <div className='text-sm truncate'>{formatMessage({id: displayLabelForSettingKey(key)})}</div>
                  </Label>
                  <InputRaw value={settings[key]} className="w-28" />
                </Group>
              ))  
            }
          </div>
        )}
      </TerminalProvider>
    </Widget>
  )
}

function displayLabelForSettingKey(key) {
  switch (parseInt(key)) {
    case 0:   return 'grbl.setting.step_pluse'
    case 1:   return 'grbl.setting.step_delay'
    case 2:   return 'grbl.setting.step_port_invert'
    case 3:   return 'grbl.setting.direction_port_invert'
    case 4:   return 'grbl.setting.step_enable_invert'
    case 5:   return 'grbl.setting.limit_pins_invert'
    case 6:   return 'grbl.setting.probe_pin_invert'
    case 10:   return 'grbl.setting.status_report'
    case 11:   return 'grbl.setting.junction_deviation'
    case 12:   return 'grbl.setting.arc_tolerance'
    case 13:   return 'grbl.setting.report_inches'
    case 20:   return 'grbl.setting.soft_limits'
    case 21:   return 'grbl.setting.hard_limits'
    case 22:   return 'grbl.setting.homing_cycle'
    case 23:   return 'grbl.setting.homing_dir_invert'
    case 24:   return 'grbl.setting.homing_feed'
    case 25:   return 'grbl.setting.homing_seek'
    case 26:   return 'grbl.setting.homing_debounce'
    case 27:   return 'grbl.setting.homing_pulloff'
    case 30:   return 'grbl.setting.max_spindle_speed'
    case 31:   return 'grbl.setting.min_spindle_speed'
    case 32:   return 'grbl.setting.laser_mode'
    case 100:   return 'grbl.setting.x_steps_on_mm'
    case 101:   return 'grbl.setting.y_steps_on_mm'
    case 102:   return 'grbl.setting.z_steps_on_mm'
    case 110:   return 'grbl.setting.x_max_rate'
    case 111:   return 'grbl.setting.y_max_rate'
    case 112:   return 'grbl.setting.z_max_rate'
    case 120:   return 'grbl.setting.x_acceleration'
    case 121:   return 'grbl.setting.y_acceleration'
    case 122:   return 'grbl.setting.z_acceleration'
    case 130:   return 'grbl.setting.x_max_travel'
    case 131:   return 'grbl.setting.y_max_travel'
    case 132:   return 'grbl.setting.z_max_travel'
    default:    return 'grbl.setting.unknown'
  }
}