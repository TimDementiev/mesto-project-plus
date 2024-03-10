import express from "express";
import {
  getAllUsers,
  getUserById,
  postUser,
  patchUser,
  patchUserAvatar,
} from "../controllers/users";

const router = express.Router();

router.post("/", postUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.patch("/me", patchUser);
router.patch("/me/avatar", patchUserAvatar);

export default router;
