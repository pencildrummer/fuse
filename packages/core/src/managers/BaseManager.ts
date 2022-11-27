interface ManagerInterface {
  readonly initialized: boolean;
  init(): void;
}

export default class BaseManager implements ManagerInterface {
  private _initialized: boolean = false;
  get initialized() {
    return this._initialized;
  }

  constructor() {
    this.init = new Proxy(this.init, {
      apply(target, thisArg, argArray) {
        if (this._initialized)
          throw new Error(`Trying to re-initialize ${this.constructor.name}`);

        // Calling original init
        target.apply(thisArg, argArray);

        thisArg._initialized = true;
      },
    });
  }

  init(): void {
    throw new Error(
      "BaseManager cannot be instantiated, must be as base class for managers"
    );
  }
}
