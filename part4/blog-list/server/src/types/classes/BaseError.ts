export default class BaseError implements Error {
  name: string;
  message: string;

  constructor(name: string, message?: string) {
    this.name = name;
    this.message = message ? message : "404 not found";
  }
}