import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token sent:", config.headers.Authorization );
  }
  else {
    console.log("No token found");
  }

  return config;
});

export default API;