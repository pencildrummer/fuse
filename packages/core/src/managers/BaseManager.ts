import { logger } from "../logger";

interface ManagerInterface {
  readonly initialized: boolean;
  init(): Promise<void>;
}

export default class BaseManager implements ManagerInterface {
  private _initialized: boolean = false;
  get initialized() {
    return this._initialized;
  }

  constructor() {
    this.init = new Proxy(this.init, {
      async apply(target, thisArg, argArray) {
        if (this._initialized)
          throw new Error(
            `Trying to re-initialize ${thisArg.constructor.name}`
          );

        logger.pending(`${thisArg.constructor.name} is initializing...`);

        // Calling original init
        if (target.constructor.name === "AsyncFunction") {
          await target.apply(thisArg, argArray);
        } else {
          target.apply(thisArg, argArray);
        }

        thisArg._initialized = true;
        logger.ready(`${thisArg.constructor.name} is now ready!`);
      },
    });
  }

  async init(): Promise<void> {
    throw new Error(
      "BaseManager cannot be instantiated, must be as base class for managers"
    );
  }
}
