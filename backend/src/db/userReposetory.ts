import initDatabase from "../database";

export const addUser = async (name: string, email: string) => {
  const db = await initDatabase();
  const result = await db.run("INSERT INTO users (name, email) VALUES (?, ?)", [
    name,
    email,
  ]);
  return result.lastID;
};

export const getUserById = async (id: number) => {
  const db = await initDatabase();
  const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
  return user;
};

export const getUserByEmail = async (email: Text) => {
  const db = await initDatabase();
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  return user;
};

export const getAllUsers = async () => {
  const db = await initDatabase();
  const users = await db.all("SELECT * FROM users");
  return users;
};

export const deleteUserById = async (id: number) => {
  const db = await initDatabase();
  const result = await db.run("DELETE FROM users WHERE id = ?", [id]);
  return result.changes;
};

export const deleteUserByEmail = async (email: Text) => {
  const db = await initDatabase();
  const result = await db.run("DELETE FROM users WHERE id = ?", [email]);
  return result.changes;
};
