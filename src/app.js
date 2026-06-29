import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
export default function createApp() {
  const app = express();

  app.use(express.json({ limit: "3mb" }));
  app.use(express.urlencoded({ extended: true, limit: "3mb" }));

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  return app;
}
