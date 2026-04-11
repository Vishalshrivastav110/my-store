import express from "express";
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  searchProducts,
} from "../controllers/productController.js";

const router = express.Router();

// SEARCH FIRST (🔥 order matters)
router.get("/search", searchProducts);

// CATEGORY
router.get("/category/:name", getProductsByCategory);

// SINGLE PRODUCT
router.get("/:id", getProductById);

// ALL PRODUCTS
router.get("/", getProducts);

// CREATE
router.post("/", createProduct);

export default router;
