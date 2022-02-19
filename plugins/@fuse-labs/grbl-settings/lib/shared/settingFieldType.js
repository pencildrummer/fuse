import GRBLSettingId from "./GRBLSettingId.ts";

export function getSettingFieldType(settingId) {
  switch (settingId) {
    case GRBLSettingId.STEP_ENABLE_INVERT:
    case GRBLSettingId.LIMIT_PINS_INVERT:
    case GRBLSettingId.PROBE_PIN_INVERT:
      return Boolean
    default:
      return Number
  }
}