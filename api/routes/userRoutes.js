import { Router } from "express";
import userController from "../controllers/userController.js";

const route = Router();

route.post("/api/auth/sign-up", userController.register);

export default route;
