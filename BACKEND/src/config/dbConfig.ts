import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root", // or your MySQL username
  password: "", // or your MySQL password
  database: "lettehubdb",
});

export default pool.promise();
