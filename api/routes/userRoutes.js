import { Router } from "express";
import userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const route = Router();

route.post("/api/auth/sign-up", userController.register);
route.post("/api/auth/activate", userController.activate);
route.post("/api/auth/sign-in", userController.signing);
route.post("/api/auth/access", userController.access);
route.post("/api/auth/forgot-password", userController.forgot);
route.post("/api/auth/reset-password",auth, userController.reset);
route.get("/api/auth/user", auth, userController.info);
route.patch("/api/auth/user_update", auth, userController.update);

export default route;
