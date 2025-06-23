"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.authController.login);
router.post("/register", auth_controller_1.authController.register);
router.post("/logout", auth_controller_1.authController.logout);
exports.default = router;
