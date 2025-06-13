import { Router } from "express";
import { cartController } from "./cart.controller";

const router = Router();

router.get("/", cartController.getCart);
router.post("/add", cartController.addToCart);
router.post("/remove", cartController.removeFromCart);
router.post("/clear", cartController.clearCart);

export default router;