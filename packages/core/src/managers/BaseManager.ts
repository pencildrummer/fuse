interface ManagerInterface {
  readonly initialized: boolean;
  init(): void;
}

export default class BaseManager implements ManagerInterface {
  protected _initialized: boolean = false;
  get initialized() {
    return this._initialized;
  }

  init(): void {
    throw new Error(
      "BaseManager cannot be instantiated, must be as base class for managers"
    );
  }
}
