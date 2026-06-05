import { Router } from "express"
import * as authController from "../controllers/authController"
import { requireAuth } from "../middleware/auth.middleware"
import { prisma } from "../lib/prisma"

const router = Router()

router.post("/login", authController.loginAdminController);

router.get("/me", requireAuth, authController.checkAuthController);

// router.post('/create', authController.createUserController);
router.post('/logout', authController.logoutUserController);
export default router
