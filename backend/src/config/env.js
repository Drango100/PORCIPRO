import dotenv from "dotenv";
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 4000),
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  AUTO_MIGRATE: String(process.env.AUTO_MIGRATE || "true").toLowerCase() === "true",

  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT || 3306),
  DB_USER: process.env.DB_USER || process.env.DB_USERNAME || "root",
  DB_PASS: process.env.DB_PASS ?? process.env.DB_PASSWORD ?? "",
  DB_NAME: process.env.DB_NAME || process.env.DB_DATABASE || "agroplus",

  JWT_SECRET: process.env.JWT_SECRET || "please-change-me",
  JWT_EXPIRES: process.env.JWT_EXPIRES || "7d",
  COOKIE_NAME: process.env.COOKIE_NAME || "auth_token",
  BCRYPT_ROUNDS: Math.max(10, Number(process.env.BCRYPT_ROUNDS || 10)),
};
