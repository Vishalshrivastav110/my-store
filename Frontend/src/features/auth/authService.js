import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
