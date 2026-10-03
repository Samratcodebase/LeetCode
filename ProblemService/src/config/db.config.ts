import mongoose from "mongoose";
import logger from "./logger.config";
import { serverConfig } from ".";

export const connectDB = async () => {
  try {
    const DB_URL = serverConfig.DB_URL;
    await mongoose.connect(DB_URL);
    logger.info("Connected to mongodb successfully");
    mongoose.connection.on("error", (error) => {
      logger.error("Mongodb Connection Error", error);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB Disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed");
      process.exit(0);
    });
  } catch (error) {
    logger.error("Failed to Connect to Mongodb");
    process.exit(1);
  }
};
