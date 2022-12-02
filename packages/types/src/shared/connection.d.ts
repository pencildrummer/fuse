export namespace Connection {
  type Type = "serial" | "network";
  export interface Interface {
    get isOpen(): boolean;
    open(callback: ErrorCallback);
    close(callback: ErrorCallback);
    write(data: any, opts?: any);
    addParser(parser: any): any;
  }
}
