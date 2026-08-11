import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import securityMiddleware from "./middleware/security.middleware.js";
import googleOAuthMiddleware from "./middleware/googleOAuth.middleware.js";
import ErrorHandler from "./middleware/errorHandler.middleware.js";
import authRouter from "./modules/public/auth/auth.route.js";
import seriesRouter from "./modules/public/series/series.route.js";
import playerRouter from "./modules/public/player/player.route.js";
import matchRouter from "./modules/public/match/match.route.js";
import teamRouter from "./modules/public/team/team.route.js";
import scoreRouter from "./modules/public/score/score.route.js";
// Ensure all models are registered with Mongoose before any populate() runs
import "./model/user.model.js";
import "./model/player.model.js";
import "./model/team.model.js";
import "./model/series.model.js";
import "./model/match.model.js";
import "./model/score.model.js";
import "./model/commentary.model.js";
export default function createApp() {
  const app = express();

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  securityMiddleware(app);
  googleOAuthMiddleware(app);

  app.use("/api/auth", authRouter);
  app.use("/api/series", seriesRouter);
  app.use("/api/match", matchRouter);
  app.use("/api/player", playerRouter);
  app.use("/api/team", teamRouter);
  app.use("/api/score", scoreRouter);

  app.use(ErrorHandler);

  return app;
}
