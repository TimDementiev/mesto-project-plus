import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import Errors from "../errors/errors";
import { ERROR } from '../constants/errors';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    match: /^https?:\/\/.+/,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: "Неправильный формат почты",
    },
    // validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

interface UserModel extends mongoose.Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (
    // eslint-disable-next-line no-unused-vars
    email: string,
    // eslint-disable-next-line no-unused-vars
    password: string
    // eslint-disable-next-line no-unused-vars
  ) => Promise<mongoose.Document<unknown, any, IUser>>;
}

userSchema.static(
  "findUserByCredentials",
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email })
      .select("+password")
      .then((user: { password: string }) => {
        if (!user) {
          return Promise.reject(Errors.authorizationError(ERROR.message.AUTHORIZATION_ERROR));
        }
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(Errors.authorizationError(ERROR.message.AUTHORIZATION_ERROR));
          }
          return user;
        });
      });
  }
);

export default mongoose.model<IUser, UserModel>("user", userSchema);
