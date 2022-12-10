import ClientBaseManager from "./ClientBaseManager.js";

function getProxiedManager<T extends ClientBaseManager>(manager: T): T {
  const alwaysForwarded: (string | symbol)[] = ["$$typeof"];

  function forwardOriginal(target: T, p: string | symbol, receiver: any) {
    let value = target[p];
    if (value instanceof Function) {
      return function (...args) {
        return (value as Function).apply(
          this === receiver ? target : this,
          args
        );
      };
    } else {
      return value;
    }
  }

  return new Proxy(manager, {
    get(target, prop, receiver) {
      let value = target[prop];

      if (alwaysForwarded.includes(prop) || target.initialized) {
        return forwardOriginal(target, prop, receiver);
      } else if (prop === "init") {
        // Return init fn binding to target
        return async function (...args) {
          return value.apply(target, args);
        };
      }

      let error = new Error(
        `Trying accessing '${prop.toString()}' ${
          value instanceof Function ? "function" : "attribute"
        } on "non-initialized" "${manager.constructor.name}"`
      );
      console.error(error);
      throw error;
    },
  });
}

export default getProxiedManager;
