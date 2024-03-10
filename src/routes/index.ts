import express from "express";
import usersRouter from "./users";
import cardsRouter from "./cards";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);

export default router;
