import axios from "axios";

const API_URL = "https://my-store-ujtk.onrender.com/api/products";

export const searchProducts = async (keyword) => {
  const { data } = await axios.get(
    `${API_URL}/search?keyword=${keyword}`
  );
  return data;
};

// GET all products
export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// GET single product by ID
export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
