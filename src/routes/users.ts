import express from "express";
import { Joi, celebrate } from 'celebrate';
import mongoose from 'mongoose';
import {
  getAllUsers,
  getUserById,
  patchUser,
  patchUserAvatar,
  getCurrentUser,
} from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }

        return value;
      })
      .required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
}), patchUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^(http|https):\/\/[a-zA-Z0-9]+([-.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?((\/[a-zA-Z0-9%-~]+)*)?(#[a-zA-Z0-9_%-]*)?$/).required(),
  }),
}), patchUserAvatar);

export default router;
