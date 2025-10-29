import axios from "axios";

const API_URL = "http://localhost:4000/api/auth"; // tu backend

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);

export const loginUser = (userData) => axios.post(`${API_URL}/login`, userData);