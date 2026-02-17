import { Router } from "express";
import multer from "multer";
import { analyzeInteraction, analyzeUploadedFile } from "../controllers/interactionController.js";
import { askChat } from "../controllers/chatController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post("/check-interaction", analyzeInteraction);
router.post("/analyze", analyzeInteraction);
router.post("/upload", upload.single("file"), analyzeUploadedFile);
router.post("/ask-ai", askChat);
router.post("/chat", askChat);

export default router;
