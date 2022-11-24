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
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
  },
  process.stdout
    ? pretty({
        colorize: true,
        destination: process.stdout,
        levelFirst: true,
        // customPrettifiers: {
        //   level: (level) => `LVL: ${level}`,
        // },
        levelLabel: "label",
        // @ts-ignore
        useOnlyCustomProps: false,
        // @ts-ignore: Missing customLevels in type def
        customLevels:
          "log:31,success:32,pending:33,start:34,complete:35,ready:36",
        customColors:
          "info:blue,warn:yellow,log:white,success:green,pending:magenta,start:blueBright,complete:green,ready:greenBright",
      })
    : process.stdout
);
