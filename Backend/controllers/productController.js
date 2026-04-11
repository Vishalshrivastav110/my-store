import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc    Get products by category
 * @route   GET /api/products/category/:name
 * @access  Public
 */
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({
    category: req.params.name,
  });

  res.json(products);
});

/**
 * @desc    Search products
 * @route   GET /api/products/search?keyword=phone
 * @access  Public
 */
export const searchProducts = async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: { $regex: req.query.keyword, $options: "i" },
      }
    : {};

  const products = await Product.find({ ...keyword });
  res.json(products); // ✅ array hi bhejna
};

/**
 * @desc    Create a product
 * @route   POST /api/products
 * @access  Admin
 */
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    countInStock: req.body.countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
