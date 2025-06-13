import { Router } from "express";
import { catalogController } from "./catalog.controller";

const router = Router();

router.get("/", catalogController.getAllProducts);
router.get("/:id", catalogController.getProductById);

export default router;