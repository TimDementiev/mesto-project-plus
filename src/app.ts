import express from "express";
import { Response, NextFunction, Request } from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import env from '../config';
import { pageError, serverErorr } from "./middlewares/error";

export interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

const app = express();
// const { PORT = 3000, MONGO_URL = "mongodb://127.0.0.1:27017/mestodb" } = process.env;

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
app.use(serverErorr);
app.listen(env.PORT, () => console.log(`App listening on port ${env.PORT}`));
