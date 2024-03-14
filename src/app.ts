import express from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import env from '../config';
import { pageError, serverErorr } from "./middlewares/error";
import { requestLogger, errorLogger } from './middlewares/logger';
import { celebrate, Joi, errors } from 'celebrate';
import authorization from './middlewares/auth';
import { createUser, login } from './controllers/users';
import helmet from "helmet";

const app = express();
mongoose.connect(env.MONGO_URL);
app.use(requestLogger);
// const helmet = require('helmet');
app.use(helmet());
app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(http|https):\/\/[a-zA-Z0-9]+([-.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?((\/[a-zA-Z0-9%-~]+)*)?(#[a-zA-Z0-9_%-]*)?$/),
    about: Joi.string().min(2).max(200),
  }),
}), createUser);

app.use(authorization, router);
app.use(pageError);
app.use(errorLogger);
app.use(errors());
app.use(serverErorr);
app.listen(env.PORT, () => console.log(`App listening on port ${env.PORT}`));