import { Response, NextFunction, Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

const userAuthorization = (req: AuthRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '65eba086334528fd938696cc',
  };

  next();
};

export default userAuthorization;