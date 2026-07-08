import express from "express";
import AuthController from "./auth.controller.js";
import passport from "passport";
import { asyncHandler } from "../../../shared/error/asyncHandler.js";
import { validateRequest } from "../../../middleware/validateRequest.js";
import { registerSchema } from "./auth.validator.js";
let router = express.Router();
let authController = new AuthController();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  asyncHandler(authController.GoogleCallback.bind(authController)),
);

router.get("/me", asyncHandler(authController.getMe.bind(authController)));

router.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(authController.registerController.bind(authController)),
);

router.get(
  "/refreshToken",
  asyncHandler(authController.refreshAccessToken.bind(authController)),
);

export default router;
