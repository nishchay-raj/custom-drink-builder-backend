import { Router } from "express";

import * as paymentController from "../controllers/paymentController";
import { requireAuth,requireRole } from "../middleware/auth.middleware";

const router = Router();

router.post('/phonepe/initiate', paymentController.initiatePaymentController);
// router.get('/check-status', paymentController.getOrderStatusController);
router.get('/get/all', requireAuth,requireRole("KITCHEN", "MANAGER", "WAITER"), paymentController.getAllPaymentsController);
router.post("/verify", paymentController.verifyPaymentController)

// router.get('/phonepe/get/:id', requireAuth, getPhonePeOrderStatusController);
export default router;