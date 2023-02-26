import BaseError from "./BaseError";

export default class ValidationError extends BaseError {
  constructor(message?: string) {
    super("ValidationError", message ? message : "Invalid Input");
  }
}