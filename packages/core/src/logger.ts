import pino from "pino";
import pretty from "pino-pretty";

export const logger = pino(
  {
    level: "debug",
    customLevels: {
      log: 31,
      success: 32,
      pending: 33,
      start: 34,
      complete: 35,
      ready: 36,
    },
    useLevelsLabel: true,
  },
  pretty
    ? pretty({ colorize: true, destination: process.stdout })
    : process.stdout
);
