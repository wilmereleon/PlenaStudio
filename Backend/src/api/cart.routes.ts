import { Router } from "express";
import { cartController } from "./cart.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Endpoints RESTful para gestión de carrito
router.get("/", authMiddleware, cartController.getCart);
router.post("/", authMiddleware, cartController.saveCart);
router.post("/add", authMiddleware, cartController.addToCart);
router.post("/remove", authMiddleware, cartController.removeFromCart);
router.post("/clear", authMiddleware, cartController.clearCart);
router.post("/sync", authMiddleware, cartController.syncCartOnLogin);

export default router;