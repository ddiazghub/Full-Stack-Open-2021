import BaseError from "./BaseError";

export default class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    super("UnauthorizedError", message ? message : "401 unauthorized");
  }
}