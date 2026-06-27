import dotenv from "dotenv";
dotenv.config();
import z from "zod";
import logger from "./logger.js";

const envSchema = z.object({
  PORT: z.coerce.number(),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  logger.info("Invalid env variables:", error.format())
  process.exit(1); 
}

export default data;