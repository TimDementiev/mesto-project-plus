import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/errors";
import Errors from "../errors/errors";

export const pageError = (req: Request, res: Response, next: NextFunction) => {
  next(Errors.notFoundPage());
};

export const serverErorr = (
  error: { status: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status = INTERNAL_SERVER_ERROR.code, message } = error;
  res.status(status).send({
    message:
      status === INTERNAL_SERVER_ERROR.code
        ? INTERNAL_SERVER_ERROR.message
        : message,
  });
  next();
};
