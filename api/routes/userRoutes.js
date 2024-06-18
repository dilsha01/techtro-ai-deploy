import { Router } from "express";
import userController from "../controllers/userController.js";

const route = Router();

route.post("/api/auth/sign-up", userController.register);
route.post("/api/auth/activate", userController.activate);
route.post("/api/auth/sign-in", userController.signing);
route.post("/api/auth/access", userController.access);
route.post("/api/auth/forgot-password", userController.forgot);


export default route;
