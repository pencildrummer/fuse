import AppError from "./AppError";

export default class AppConnectionError extends AppError {
  constructor(cause: unknown) {
    super("Error connecting to coreSocket");
    this.cause = cause;
  }
}
