import { Router } from "express";
import * as orderController from "../controllers/orderController";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

const router = Router();

router.post('/create/online', orderController.createOnlineOrderController);
// router.post('/create/offline', orderController.createOfflineOrderController);
router.get('/get/all', requireAuth, requireRole("KITCHEN", "MANAGER", "WAITER") ,orderController.getAllOrdersController);
router.get('/get/:orderId' ,orderController.getOrderItemsController);
router.post('/mark/paid', requireAuth, requireRole("MANAGER", "WAITER") ,orderController.markOrderPaidController);
router.post('/mark/void', requireAuth,requireRole("MANAGER", "WAITER"), orderController.markOrderVoidController);
router.patch('/:id/update/status', requireAuth,requireRole("KITCHEN", "MANAGER", "WAITER"), orderController.changeOrderStatusController);
router.get('/recent',requireAuth, requireRole("KITCHEN", "MANAGER", "WAITER"),  orderController.getRecentFiveOrderController);
export default router;