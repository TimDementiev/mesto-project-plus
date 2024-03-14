import { NextFunction, Request, Response } from "express";
import { ERROR } from "../constants/errors";
import Errors from "../errors/errors";

export const pageError = (req: Request, res: Response, next: NextFunction) => {
  next(Errors.notFound(ERROR.message.NOT_FOUND_PAGE));
};

export const serverErorr = (
  error: { status: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status = ERROR.code.SERVER, message } = error;
  res.status(status).send({
    message:
      status === ERROR.code.SERVER
        ? ERROR.message.INTERNAL_SERVER_ERROR
        : message,
  });
  next();
};
