import { Router } from "express";
import * as feedbackController from "../controllers/feedbackController";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/all", requireAuth, feedbackController.getFeedBackController);
router.post("/create", feedbackController.createFeedbackController);

export default router;