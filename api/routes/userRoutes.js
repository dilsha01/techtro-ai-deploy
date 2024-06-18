import { Router } from "express";
import userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/api/auth/sign-up", userController.register);
router.post("/api/auth/activate", userController.activate);
router.post("/api/auth/sign-in", userController.signing);
router.post("/api/auth/access", userController.access);
router.post("/api/auth/forgot-password", userController.forgot);
router.post("/api/auth/reset-password", auth, userController.reset);
router.get("/api/auth/user", auth, userController.info);
router.patch("/api/auth/user-update", auth, userController.update);
router.get("/api/auth/sign-out", userController.signout);
router.post("/api/auth/google-sign-in", userController.google);

export default router;
