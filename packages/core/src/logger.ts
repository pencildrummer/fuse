import pino, { DestinationStream } from "pino";
import pretty from "pino-pretty";
import type { Logger as PinoLogger, LoggerOptions } from "pino";

type Logger<Options extends LoggerOptions> = PinoLogger<Options> & {
  scope(scopeName: string): Logger<Options>;
};

function loggerFactory<Options extends LoggerOptions>(
  options: Options,
  stream: DestinationStream
): Logger<Options> {
  let instance = pino(options, stream);
  // Add scope custom helper
  Object.defineProperties(instance, {
    scope: {
      value: function (scopeName: string) {
        return this.child({ scope: scopeName });
      },
    },
  });
  return instance as Logger<Options>;
}

const logger = loggerFactory(
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

export { logger };
