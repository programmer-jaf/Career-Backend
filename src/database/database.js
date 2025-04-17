import mongoose from "mongoose";
import config from "../config/config.js";
const connectDB = async () => {
  try {
    const coneectionHost = await mongoose.connect(config.mongodb_uri);
    console.log("Database connected ", coneectionHost.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
