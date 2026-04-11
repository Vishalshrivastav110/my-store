import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const searchProducts = async (keyword) => {
  const { data } = await axios.get(
    `/api/products/search?keyword=${keyword}`
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
