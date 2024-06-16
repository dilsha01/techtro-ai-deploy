import express from "express";
import {signup} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signup);


export default authRouter;
