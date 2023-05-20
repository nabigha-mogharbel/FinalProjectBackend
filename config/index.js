import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 5000;
export const MODE=process.env.PORT || "dev";
export const SOCKET= process.env.SOCKET||8000
export const JWT_SECRET=process.env.JWT_SECRET
export const MONGO=process.env.MONGO
export const DBNAME=process.env.DBNAME