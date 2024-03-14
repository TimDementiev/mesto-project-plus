import { NextFunction, Request, Response } from "express";
import Errors from "../errors/errors";
import Card from "../models/card";
import { AuthRequest } from '../middlewares/auth';
import { ERROR } from '../constants/errors';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .select("-__v")
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

export const postCard = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: userId,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(Errors.badRequest(ERROR.message.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw Errors.notFound(ERROR.message.NOT_FOUND_REQUEST);
      }
      if (card.owner.toString() !== userId) {
        throw Errors.forbiddenError();
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => {
      res.send({
        message: "Карточка удалена",
        data: card,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(Errors.badRequest(ERROR.message.INVALID_ID_ERROR));
      } else {
        next(err);
      }
    });
};

export const likeCard = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw Errors.notFound(ERROR.message.NOT_FOUND_REQUEST);
      }
      res.send({
        message: "Лайк поставлен",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(Errors.badRequest(ERROR.message.INVALID_ID_ERROR));
      } else {
        next(err);
      }
    });
};

export const dislikeCard = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id || {};
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw Errors.notFound(ERROR.message.NOT_FOUND_REQUEST);
      }
      res.send(
        // card
        { message: "Лайк удален" }
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(Errors.badRequest(ERROR.message.INVALID_ID_ERROR));
      } else {
        next(err);
      }
    });
};
