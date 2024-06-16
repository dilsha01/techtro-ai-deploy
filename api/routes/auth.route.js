import express from "express";
import {signup, signin} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signup);
authRouter.post("/sign-in", signin);

export default authRouter;
