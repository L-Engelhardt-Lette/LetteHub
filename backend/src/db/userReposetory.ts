import User from "../models/user.model"; // Import the User model

// Add a new user to the database
export const addUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const user = await User.create({ username, email, password });
    return user.id;
  } catch (error) {
    throw new Error(`Failed to add user: ${error}`);
  }
};

// Get a user by ID
export const getUserById = async (id: number) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new Error(`Failed to get user by ID: ${error}`);
  }
};

// Get a user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error(`Failed to get user by email: ${error}`);
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(`Failed to get all users: ${error}`);
  }
};

// Delete a user by ID
export const deleteUserById = async (id: number) => {
  try {
    const result = await User.destroy({ where: { id } });
    return result;
  } catch (error) {
    throw new Error(`Failed to delete user by ID: ${error}`);
  }
};

// Delete a user by email
export const deleteUserByEmail = async (email: string) => {
  try {
    const result = await User.destroy({ where: { email } });
    return result;
  } catch (error) {
    throw new Error(`Failed to delete user by email: ${error}`);
  }
};
