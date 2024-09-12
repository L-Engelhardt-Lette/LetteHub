import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (identifier: string, password: string) => {
  return API.post("/auth/login", { identifier, password });
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  return API.post("/auth/register", { username, email, password });
};

export const getProjects = async () => {
  return API.get("/projects");
};
