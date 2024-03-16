import express from "express";
import userRouter from "./v1/userRouter";
const router = express.Router();

router.use("/v1/user", userRouter);

export default router;