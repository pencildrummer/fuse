import GRBLSettingId from "./GRBLSettingId.ts";

export function getSettingFieldType(settingId) {
  switch (parseInt(settingId)) {
    case GRBLSettingId.STEP_ENABLE_INVERT:
    case GRBLSettingId.LIMIT_PINS_INVERT:
    case GRBLSettingId.PROBE_PIN_INVERT:

    case GRBLSettingId.REPORT_INCHES:
    
    case GRBLSettingId.SOFT_LIMITS:
    case GRBLSettingId.HARD_LIMITS:
    case GRBLSettingId.HOMING_CYCLE:

    case GRBLSettingId.LASER_MODE:
      return Boolean

    default:
      return Number
  }
}