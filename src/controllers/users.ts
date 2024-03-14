import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Errors from "../errors/errors";
import { AuthRequest } from "../middlewares/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.find({})
    .select("-__v")
    .then((users) => res.send(users))
    .catch(next);
};

export const getUserById = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  User.findById(userId)
    .select("-__v")
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(Errors.notFoundRequest());
      } else {
        next(err);
      }
    });
};

export const postUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, about, avatar, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash: string) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(Errors.badRequest());
      } else if (err.code === 11000) {
        next(Errors.conflictError());
      } else {
        next(err);
      }
    });
};

export const patchUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const _id = req.user?._id;
  const { name, about } = req.body;
  User.findOneAndUpdate(
    { _id },
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .select("-__v")
    .then((user) => {
      if (!user) {
        throw Errors.notFoundRequest();
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(Errors.badRequest());
      } else {
        next(err);
      }
    });
};

export const patchUserAvatar = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const _id = req.user?._id;
  const { avatar } = req.body;
  User.findOneAndUpdate(
    { _id },
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .select("-__v")
    .then((user) => {
      if (!user) {
        throw Errors.notFoundRequest();
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(Errors.badRequest());
      } else {
        next(err);
      }
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "super-secret", {
        expiresIn: "3d",
      });
      res.cookie("token", token, { httpOnly: true });
      res.send({ message: "Успешная авторизация" });
    })
    .catch(next);
};

export const getCurrentUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const _id = req.user?._id;
  User.findById(_id)
    .select("-__v")
    .then((user) => {
      if (!user) {
        throw Errors.notFoundRequest();
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(Errors.invalidId());
      } else {
        next(err);
      }
    });
};
