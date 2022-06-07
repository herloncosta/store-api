import express from "express";
import SupplierController from "../controllers/supplier.controller.js";

const router = express.Router();

router.post("/", SupplierController.createSupplier);
router.get("/", SupplierController.getSuppliers);
router.get("/:id", SupplierController.getSupplier);
router.put("/:id", SupplierController.updateSupplier);
router.delete("/:id", SupplierController.deleteSupplier);

export default router;
