import { Router } from "express";
import * as flavorsController from "../controllers/flavorsController";
import { requireAuth, requireRole } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", requireAuth, requireRole("MANAGER") , flavorsController.createFlavors);
router.get("/userget/:baseDrinkId", flavorsController.getflavorsforUsers);
router.get("/adminget", requireAuth, requireRole("MANAGER") , flavorsController.getFlavorsforAdmin);
router.put("/update/:flavorId", requireAuth, requireRole("MANAGER") , flavorsController.editFlavors);
router.delete("/delete/:flavorId", requireAuth, requireRole("MANAGER") , flavorsController.deleteFlavor);
router.patch("/toggleavailability/:flavorId", requireAuth, requireRole("MANAGER") , flavorsController.toggleAvailability);
export default router;