import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import cors from "cors";
import ratelimit from "express-rate-limit";
import express from "express";
import env from "../config/env.js";
import cookieParser from 'cookie-parser';

export default function securityMiddleware(app) {
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
      credentials: true,
    }),
  );
  app.use(
    ratelimit({
      windowMs: env.RATELIMIT_WINDOWMS,
      limit: env.RATELIMIT,
      legacyHeaders: true,
      message: "too many request try again after few minutes",
    }),
  );
  app.use(hpp());
  app.use(compression());
  app.use(express.json({ limit: "3mb" }));
  app.use(express.urlencoded({ extended: true, limit: "3mb" }));
  app.use(cookieParser());
}
