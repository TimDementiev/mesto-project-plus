import {
  BAD_REQUEST,
  NOT_FOUND_REQUEST,
  NOT_FOUND_PAGE,
  INVALID_ID_ERROR,
  AUTHORIZATION_ERROR,
  UNAURHORIZATION_ERROR,
  FORBIDDEN_ERROR,
  CONFLICT_ERROR,
} from "../constants/errors";

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

  static invalidId() {
    return new Errors(INVALID_ID_ERROR.code, INVALID_ID_ERROR.message);
  }

  static authorizationError() {
    return new Errors(AUTHORIZATION_ERROR.code, AUTHORIZATION_ERROR.message);
  }

  static unauthorizationError() {
    return new Errors(
      UNAURHORIZATION_ERROR.code,
      UNAURHORIZATION_ERROR.message
    );
  }

  static forbiddenError() {
    return new Errors(FORBIDDEN_ERROR.code, FORBIDDEN_ERROR.message);
  }

  static conflictError() {
    return new Errors(CONFLICT_ERROR.code, CONFLICT_ERROR.message);
  }
}

export default Errors;
