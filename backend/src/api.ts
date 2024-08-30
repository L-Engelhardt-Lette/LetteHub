import axios from "axios";

const API_URL = "http://localhost:3001";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const addUser = async (name: string, email: string): Promise<User> => {
  const response = await axios.post<User>(`${API_URL}/users`, { name, email });
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${API_URL}/users`);
  return response.data;
};
