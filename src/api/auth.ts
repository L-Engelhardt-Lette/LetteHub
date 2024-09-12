import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return true;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
