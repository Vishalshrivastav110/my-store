import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.js";
import connectDB from "./config/db.js";
import products from "./data/products.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany(); // clear existing products
    const createdProducts = await Product.insertMany(products);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
