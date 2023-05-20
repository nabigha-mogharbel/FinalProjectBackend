import mongoose from "mongoose";
import {MONGO, DBNAME} from "./index.js"
const connectDB = async () => {
  console.log(MONGO)
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONGO, {
      useUnifiedTopology: true,
      dbName: process.env.DBNAME,
    });
    console.log(`Connected to: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

export default connectDB;