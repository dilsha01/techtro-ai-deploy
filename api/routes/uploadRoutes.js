import express from "express";
import uploadMiddleware from "../middlewares/upload.js";
import uploadImageMiddleware from "../middlewares/uploadImage.js";
import authMiddleware from "../middlewares/auth.js";
import { uploadAvar } from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/api/upload",
  uploadImageMiddleware.single("image"),
  uploadMiddleware.single("avatar"),
  authMiddleware,
  uploadAvar
);

export default router;
