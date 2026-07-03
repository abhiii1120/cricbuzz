import env from "../config/env.js";
import jwt from "jsonwebtoken";
import UnAuthorize from "../shared/error/unAuthorize.error.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new UnAuthorize("Access Token Expired");
    }

    throw new UnAuthorize("Token not found");
  }
};

export const authorizationMiddleware = (role) => {
  return (req, res, next) => {
    if (role.includes(req.user.role)) {
      next();
    } else {
      throw new UnAuthorize("Invalid role");
    }
  };
};
