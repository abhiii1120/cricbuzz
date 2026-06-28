import mongoose from "mongoose";
import env from '../config/env.js';
import logger from "../config/logger.js";

export const connectDB = async () => {
    await mongoose.connect(env.MONGO_URL);
    logger.info('connected to mongodb successfully');
}