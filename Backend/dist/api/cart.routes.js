"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Endpoints RESTful para gestión de carrito
router.get("/", auth_middleware_1.authMiddleware, cart_controller_1.cartController.getCart);
router.post("/", auth_middleware_1.authMiddleware, cart_controller_1.cartController.saveCart);
router.post("/add", auth_middleware_1.authMiddleware, cart_controller_1.cartController.addToCart);
router.post("/remove", auth_middleware_1.authMiddleware, cart_controller_1.cartController.removeFromCart);
router.post("/clear", auth_middleware_1.authMiddleware, cart_controller_1.cartController.clearCart);
router.post("/sync", auth_middleware_1.authMiddleware, cart_controller_1.cartController.syncCartOnLogin);
exports.default = router;
