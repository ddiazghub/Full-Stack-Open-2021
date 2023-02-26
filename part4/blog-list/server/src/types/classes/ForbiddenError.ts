import BaseError from "./BaseError";

export default class ForbiddenError extends BaseError {
  constructor(message?: string) {
    super("ForbiddenError", message ? message : "403 forbidden");
  }
}