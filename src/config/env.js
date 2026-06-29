import dotenv from "dotenv";
dotenv.config();
import z from "zod";
import logger from "./logger.js";
import appConstant from "../constant/app.constant.js";

const envSchema = z.object({
  PORT: z.coerce.number().default(appConstant.PORT),
  MONGO_URL: z.string().default(appConstant.MONGO_URL),
  NODE_ENV: z.string().default(appConstant.NODE_ENV),
  LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL),
  CORS_ORIGIN:z.string(),
  RATELIMIT_WINDOWMS:z.coerce.number().default(appConstant.RATELIMIT_WINDOWMS),
  RATELIMIT:z.coerce.number().default(appConstant.RATELIMIT)
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  logger.info("Invalid env variables:", error.format());
  process.exit(1);
}

export default data;