import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import * as tablecontroller from "../controllers/tableController";

const router = Router();

router.post("/create", requireAuth, requireRole("MANAGER"), tablecontroller.createTable);
router.get("/userget", tablecontroller.getTablesForUsers);
router.get("/staffget", requireAuth, requireRole("MANAGER", "WAITER"), tablecontroller.getTablesForStaff);
router.delete("/delete/:tableId", requireAuth, requireRole("MANAGER"), tablecontroller.deleteTable);
router.patch("/availability/:tableId", requireAuth, requireRole("MANAGER"), tablecontroller.toggleAvailability);
router.patch("/occupancy/:tableId", requireAuth, requireRole("MANAGER", "WAITER"), tablecontroller.toggleOccupancy);
router.patch("/idle/:tableId", requireAuth, requireRole("MANAGER", "WAITER"), tablecontroller.makeIdle);
export default router;