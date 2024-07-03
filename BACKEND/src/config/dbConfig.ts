import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root", // or your MySQL username
  password: "", // or your MySQL password
  database: "project_db",
});

export default pool.promise();
