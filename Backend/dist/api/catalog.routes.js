"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalog_controller_1 = require("./catalog.controller");
const router = (0, express_1.Router)();
router.get("/", catalog_controller_1.catalogController.getAllProducts);
router.get("/:id", catalog_controller_1.catalogController.getProductById);
exports.default = router;
