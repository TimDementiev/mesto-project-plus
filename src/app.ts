import express from "express";
import { Response, NextFunction, Request } from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import env from '../config';
import { pageError, serverErorr } from "./middlewares/error";
import { errors } from 'celebrate';

export interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

const app = express();

mongoose.connect(env.MONGO_URL);

app.use(express.json());

app.use((req: AuthRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "65eba086334528fd938696cc",
  };

  next();
});

app.use("/", router);
app.use(pageError);
app.use(errors());
app.use(serverErorr);
app.listen(env.PORT, () => console.log(`App listening on port ${env.PORT}`));