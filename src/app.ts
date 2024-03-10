import express from "express";
import { Response, NextFunction, Request } from "express";
import mongoose from "mongoose";
import router from "./routes/index";

import { pageError, serverErorr } from "./middlewares/error";

export interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

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
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
