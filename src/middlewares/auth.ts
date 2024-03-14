import { Response, NextFunction, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Error from "../errors/errors";
import { ERROR } from "../constants/errors";
import env from "../../config";

export interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

const userAuthorization = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { cookie } = req.headers;
  if (!cookie) {
    next(Error.authorizationError(ERROR.message.UNAURHORIZATION_ERROR));
  } else {
    try {
      const payload = jwt.verify(
        cookie!.split("=")[1],
        env.JWT_SECRET
      ) as JwtPayload;
      req.user = {
        _id: payload?._id,
      };
      next();
    } catch (error) {
      next(Error.authorizationError(ERROR.message.UNAURHORIZATION_ERROR));
    }
  }
};

export default userAuthorization;

// const userAuthorization = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith("Bearer ")) {
//     // throw new UnauthorizedError('Необходима авторизация');
//     throw Error.authorizationError(ERROR.message.UNAURHORIZATION_ERROR);
//   }
//   const token = authorization.replace("Bearer ", "");
//   try {
//     const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
//     // req.user = payload;
//     // req.user = {
//     //   _id: payload?._id,
//     // };
//     req.user = payload as any;
//     next();
//   } catch (err) {
//     // next(new UnauthorizedError('Необходима авторизация'));
//     throw Error.authorizationError(ERROR.message.UNAURHORIZATION_ERROR);
//   }
// };

// export default userAuthorization;


