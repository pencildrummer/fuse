import GRBLSettingId from './GRBLSettingId'

export default function getSettingFieldUnit(settingId) {
  switch(parseInt(settingId)) {
    case GRBLSettingId.STEP_PULSE:  return 'μs'
    case GRBLSettingId.STEP_DELAY:  return 'ms'
    case GRBLSettingId.JUNCTION_DEVIATION: return 'mm'
    case GRBLSettingId.ARC_TOLERANCE: return 'mm'
    case GRBLSettingId.HOMING_FEED: return 'mm/min'
    case GRBLSettingId.HOMING_SEEK: return 'mm/min'
    case GRBLSettingId.HOMING_DEBOUNCE: return 'ms'
    case GRBLSettingId.HOMING_PULL_OFF: return 'mm'
    case GRBLSettingId.MAX_SPINDLE_SPEED: return 'RPM'
    case GRBLSettingId.MIN_SPINDLE_SPEED: return 'RPM'
    case GRBLSettingId.X_STEPS_ON_MM: return 'steps/mm'
    case GRBLSettingId.Y_STEPS_ON_MM: return 'steps/mm'
    case GRBLSettingId.Z_STEPS_ON_MM: return 'steps/mm'
    case GRBLSettingId.X_MAX_RATE: return 'mm/min'
    case GRBLSettingId.Y_MAX_RATE: return 'mm/min'
    case GRBLSettingId.Z_MAX_RATE: return 'mm/min'
    case GRBLSettingId.X_ACCELERATION: return 'mm/s^2'
    case GRBLSettingId.Y_ACCELERATION: return 'mm/s^2'
    case GRBLSettingId.Z_ACCELERATION: return 'mm/s^2'
    case GRBLSettingId.X_MAX_TRAVEL: return 'mm'
    case GRBLSettingId.Y_MAX_TRAVEL: return 'mm'
    case GRBLSettingId.Z_MAX_TRAVEL: return 'mm'
    default:
      return null
  }
}