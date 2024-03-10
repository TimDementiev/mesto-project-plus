import { BAD_REQUEST, NOT_FOUND_REQUEST, NOT_FOUND_PAGE } from '../constants/errors';

class Errors extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static badRequest() {
    return new Errors(BAD_REQUEST.code, BAD_REQUEST.message);
  }

  static notFoundRequest() {
    return new Errors(NOT_FOUND_REQUEST.code, NOT_FOUND_REQUEST.message);
  }

  static notFoundPage() {
    return new Errors(NOT_FOUND_PAGE.code, NOT_FOUND_PAGE.message);
  }
}

export default Errors;