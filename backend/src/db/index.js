import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_PORT = Number(process.env.DB_PORT ?? 3306);
const DB_USER = process.env.DB_USER ?? process.env.DB_USERNAME ?? "root";
const DB_PASS = process.env.DB_PASS ?? process.env.DB_PASSWORD ?? ""; // respeta ""
const DB_NAME = process.env.DB_NAME ?? process.env.DB_DATABASE ?? "";

export const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,  // manda "" si está vacío ➜ using password: YES
  database: DB_NAME,
  connectionLimit: 10,
  waitForConnections: true,
});
