import type { FormItemSpec } from "@fuse-labs/core-ui";

const settings: FormItemSpec[] = [
  {
    type: "group",
    label: "Units",
    fields: [
      {
        name: "marlin.settings.units",
        type: "select",
        options: [
          { value: "in", label: "Inches" },
          { value: "mm", label: "Millimeters" },
        ],
      },
      {
        name: "marlin.settings.temperatureUnits",
        type: "select",
        options: [
          { value: "c", label: "Celsius" },
          { value: "f", label: "Fahrenheit" },
          { value: "k", label: "Kelvin" },
        ],
      },
    ],
  },
  {
    type: "group",
    label: "Steps",
    description:
      "This setting affects how many steps will be done for each unit of movement. Units will usually be set in steps-per-millimeter unless:\nThe firmware has INCH_MODE_SUPPORT enabled and has been set to Inches Mode by G20 or by having inches as the default unit.\nThe machine is a SCARA in which case the A and B axes are configured in steps-per-degree, not steps-per-distance.",
    notes: "Info detailed on bottom or notes",
    fields: [
      {
        name: "marlin.settings.extruderStepsPerUnit",
        type: "number",
        hint: "Extruder steps per unit",
      },
      {
        name: "marlin.settings.xStepsPerUnit",
        type: "number",
        hint: "X steps per unit",
      },
      {
        name: "marlin.settings.yStepsPerUnit",
        type: "number",
        hint: "Y steps per unit",
      },
      {
        name: "marlin.settings.zStepsPerUnit",
        type: "number",
        hint: "Z steps per unit",
      },
    ],
  },

  {
    type: "group",
    label: "Print move limits",
    description:
      "Set the max acceleration for one or more axes (in current units-per-second squared). With XY_FREQUENCY_LIMIT you can also set the XY frequency limits.",
    fields: [
      {
        name: "marlin.settings.extruderMaxAcceleration",
        type: "number",
      },
      {
        name: "marlin.settings.plannerFrequencyLimit",
        type: "number",
      },
      {
        name: "marlin.settings.plannerXYFrequencyMinimumSpeedPercentage",
        type: "number",
      },
      {
        name: "marlin.settings.xMaxAcceleration",
        type: "number",
      },
      {
        name: "marlin.settings.yMaxAcceleration",
        type: "number",
      },
      {
        name: "marlin.settings.zMaxAcceleration",
        type: "number",
      },
    ],
  },
  {
    type: "group",
    label: "Feedrates",
    description:
      "Set the max feedrate for one or more axes (in current units-per-second).",
    fields: [
      { name: "marlin.settings.xMaxFeedrate", type: "number" },
      { name: "marlin.settings.yMaxFeedrate", type: "number" },
      { name: "marlin.settings.zMaxFeedrate", type: "number" },
      { name: "marlin.settings.targetExtruderMaxFeedrate", type: "number" },
    ],
  },
  {
    type: "group",
    label: "Acceleration",
    description:
      "Set the preferred starting acceleration (in units/s/s) for moves of different types.",
    fields: [
      {
        name: "marlin.settings.printingAcceleration",
        type: "number",
        hint: "Printing acceleration. Used for moves that include extrusion (i.e., which employ the current tool).",
      },
      {
        name: "marlin.settings.retractAcceleration",
        type: "number",
        hint: "Retract acceleration. Used for extruder retraction moves.",
      },
      {
        name: "marlin.settings.legacyPrintingAndRetracingAcceleration",
        type: "number",
        hint: "Legacy parameter for move acceleration. Set both printing and travel acceleration.",
      },
      {
        name: "marlin.settings.travelAcceleration",
        type: "number",
        hint: "Travel acceleration. Used for moves that include no extrusion.",
      },
    ],
  },
  {
    type: "group",
    label: "Advanced",
    description: "Set various motion settings. See parameters for details.",
    fields: [
      { name: "marlin.settings.minimumSegmentTime", type: "number" },
      { name: "marlin.settings.extruderMaxJerk", type: "number" },
      { name: "marlin.settings.junctionDeviation", type: "number" },
      { name: "marlin.settings.minFeedratePrintMoves", type: "number" },
      { name: "marlin.settings.minFeedrateTravelMoves", type: "number" },
      { name: "marlin.settings.xMaxJerk", type: "number" },
      { name: "marlin.settings.yMaxJerk", type: "number" },
      { name: "marlin.settings.zMaxJerk", type: "number" },
    ],
  },
];

export default settings;
