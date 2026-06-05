import { Router } from "express";
import * as addonController from "../controllers/addonController";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", requireAuth, requireRole("MANAGER"), addonController.createAddons);
router.get("/userget", addonController.getAddonsForUsers);
router.get("/adminget", requireAuth, requireRole("MANAGER"), addonController.getAddonsForAdmin);
router.put("/update/:addonId", requireAuth, requireRole("MANAGER"), addonController.editAddon);
router.delete("/delete/:addonId", requireAuth, requireRole("MANAGER"), addonController.deleteAddon);
router.patch("/toggleavailability/:addonId", requireAuth, requireRole("MANAGER"), addonController.toggleAvailability);
export default router;