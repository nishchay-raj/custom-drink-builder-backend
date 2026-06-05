import { Router } from "express";
import * as drinkdrinkController from "../controllers/basedrinkController"
import { requireAuth, requireRole } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", requireAuth, requireRole("MANAGER"), drinkdrinkController.createBaseDrinks);
router.get("/userget", drinkdrinkController.getBaseDrinksforUsers);
router.get("/adminget", requireAuth, requireRole("MANAGER"), drinkdrinkController.getBaseDrinksforAdmin);
router.put("/update/:basedrinkId", requireAuth, requireRole("MANAGER"), drinkdrinkController.editbaseDrinks);
router.delete("/delete/:basedrinkId", requireAuth, requireRole("MANAGER"), drinkdrinkController.deletebaseDrink);
router.patch("/toggleavailability/:basedrinkId", requireAuth, requireRole("MANAGER"), drinkdrinkController.toggleAvailability);
export default router;