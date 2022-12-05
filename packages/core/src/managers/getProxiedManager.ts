import chalk from "chalk";
import { logger } from "../logger.js";
import BaseManager from "./BaseManager";

function getProxiedManager<T extends BaseManager>(manager: T): T {
  return new Proxy(manager, {
    get(target, prop, receiver) {
      let value = target[prop];
      if (prop === "init") {
        // Return init fn binding to target
        return (value as Function).bind(target);
      } else if (target.initialized) {
        return value;
      }

      let error = new Error(
        `Trying accessing '${prop.toString()}' ${
          value instanceof Function ? "function" : "attribute"
        } on ${chalk.bold.yellow("non-initialized")} "${
          manager.constructor.name
        }"`
      );
      logger.error(error);
      throw error;
    },
  });
}

export default getProxiedManager;
