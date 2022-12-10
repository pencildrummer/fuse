interface ManagerInterface {
  readonly initialized: boolean;
  init(): Promise<void>;
}

export default abstract class ClientBaseManager
  extends EventTarget
  implements ManagerInterface
{
  private _initialized: boolean = false;
  get initialized() {
    return this._initialized;
  }

  constructor() {
    super();
    this.init = new Proxy(this.init, {
      async apply(target, thisArg, argArray) {
        if (this._initialized)
          throw new Error(
            `Trying to re-initialize ${thisArg.constructor.name}`
          );

        console.log(`${thisArg.constructor.name} is initializing...`);

        // Calling original init
        await target.apply(thisArg, argArray);

        thisArg._initialized = true;
        console.log(`${thisArg.constructor.name} is now ready!`);
      },
    });
  }

  async init() {
    throw new Error(
      "BaseManager cannot be instantiated, must be as base class for managers"
    );
  }
}
