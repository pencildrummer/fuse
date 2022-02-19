enum GRBLSettingKey {
  STEP_PULSE = 'grbl.setting.step_pulse',
  STEP_DELAY = 'grbl.setting.step_delay',
  STEP_PORT_INVERT = 'grbl.setting.step_port_invert',
  DIRECTION_PORT_INVERT = 'grbl.setting.direction_port_invert',
  STEP_ENABLE_INVERT = 'grbl.setting.step_enable_invert',
  LIMIT_PINS_INVERT = 'grbl.setting.limit_pins_invert',
  PROBE_PIN_INVERT = 'grbl.setting.probe_pin_invert',

  STATUS_REPORT = 'grbl.setting.status_report',
  JUNCTION_DEVIATION = 'grbl.setting.junction_deviation',
  ARC_TOLERANCE = 'grbl.setting.arc_tolerance',
  REPORT_INCHES = 'grbl.setting.report_inches',

  SOFT_LIMITS = 'grbl.setting.soft_limits',
  HARD_LIMITS = 'grbl.setting.hard_limits',
  HOMING_CYCLE = 'grbl.setting.homing_cycle',
  HOMING_DIR_INVERT = 'grbl.setting.homing_dir_invert',
  HOMING_FEED = 'grbl.setting.homing_feed',
  HOMING_SEEK = 'grbl.setting.homing_seek',
  HOMING_DEBOUNCE = 'grbl.setting.homing_debounce',
  HOMING_PULL_OFF = 'grbl.setting.homing_pull_off',

  MAX_SPINDLE_SPEED = 'grbl.setting.max_spindle_speed',
  MIN_SPINDLE_SPEED = 'grbl.setting.min_spindle_speed',
  LASER_MODE = 'grbl.setting.laser_mode',

  X_STEPS_ON_MM = 'grbl.setting.x_steps_on_mm',
  Y_STEPS_ON_MM = 'grbl.setting.y_steps_on_mm',
  Z_STEPS_ON_MM = 'grbl.setting.z_steps_on_mm',

  X_MAX_RATE = 'grbl.setting.x_max_rate',
  Y_MAX_RATE = 'grbl.setting.y_max_rate',
  Z_MAX_RATE = 'grbl.setting.z_max_rate',
  
  X_ACCELERATION = 'grbl.setting.x_acceleration',
  Y_ACCELERATION = 'grbl.setting.y_acceleration',
  Z_ACCELERATION = 'grbl.setting.z_acceleration',

  X_MAX_TRAVEL = 'grbl.setting.x_max_travel',
  Y_MAX_TRAVEL = 'grbl.setting.y_max_travel',
  Z_MAX_TRAVEL = 'grbl.setting.z_max_travel',
}

export default GRBLSettingKey