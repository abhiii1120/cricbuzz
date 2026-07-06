import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import securityMiddleware from "./middleware/security.middleware.js";
import googleOAuthMiddleware from "./middleware/googleOAuth.middleware.js";
import ErrorHandler from "./middleware/errorHandler.middleware.js";
import authRouter from "./modules/public/auth/auth.route.js";
export default function createApp() {
  const app = express();

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  securityMiddleware(app);
  googleOAuthMiddleware(app);

  app.use("/api/auth", authRouter);

  app.use(ErrorHandler);

  return app;
}
