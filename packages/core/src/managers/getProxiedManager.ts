import chalk from "chalk";
import { logger } from "../logger.js";
import BaseManager from "./BaseManager.js";

function getProxiedManager<T extends BaseManager>(manager: T): T {
  return new Proxy(manager, {
    get(target, prop, receiver) {
      let value = target[prop];
      if (prop === "init") {
        // Forward original init to avoid warning of accessing method and props during intialization
        return function (...args) {
          return (value as Function).apply(target, args);
        };
      } else {
        if (!target.initialized) {
          if (value instanceof Function) {
            logger.warn(
              `Trying calling '${prop.toString()}' method on ${chalk.bold.yellow(
                "non-initialized"
              )} ${typeof manager}`
            );
          } else {
            logger.warn(
              `Trying accessing '${prop.toString()}' property on ${chalk.bold.yellow(
                "non-initialized"
              )} ${typeof manager}`
            );
          }
        }
      }
      // Normally forward
      return value;
    },
  });
}

export default getProxiedManager;
