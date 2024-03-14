import { ERROR } from '../constants/errors';

class Errors extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static badRequest(message: string) {
    return new Errors(ERROR.code.BAD_REQUEST, message);
  }

  static authorizationError(message: string) {
    return new Errors(ERROR.code.AUTHORIZATION, message);
  }

  static forbiddenError() {
    return new Errors(ERROR.code.FORBIDDEN, ERROR.message.FORBIDDEN_ERROR);
  }

  static notFound(message: string) {
    return new Errors(ERROR.code.NOT_FOUND, message);
  }

  static conflictError() {
    return new Errors(ERROR.code.CONFLICT, ERROR.message.CONFLICT_ERROR);
  }
}

export default Errors;
