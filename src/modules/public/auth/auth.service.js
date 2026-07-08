import jwt from "jsonwebtoken";
import UserRepo from "../../../repository/user.repository.js";
import env from "../../../config/env.js";
import AppError from "../../../shared/error/app.error.js";
import { StatusCodes } from "http-status-codes";
import { token } from "morgan";
import notFound from "../../../shared/error/notFound.error.js";
export default class AuthService {
  constructor() {
    this.UserRepo = new UserRepo();
  }

  signTokens(data) {
    let refreshToken = jwt.sign(data, env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30D",
    });

    let accessToken = jwt.sign(data, env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1H",
    });

    return { accessToken, refreshToken };
  }

  async CreateUser(user) {
    const isUser = await this.UserRepo.findByEmail(user.emails[0].value);
    let result = isUser;

    if (!isUser) {
      const _user = await this.UserRepo.create({
        email: user.emails[0].value,
        picture: user.photos[0].value,
        name: user.displayName,
      });
      result = _user;
    }

    let data = {
      _id: result._id,
      email: user.emails[0].value,
      picture: user.photos[0].value,
      name: user.displayName,
    };

    let tokens = this.signTokens(data);

    return token;
  }

  async registerUser(payload) {
    let user = {
      ...payload,
      email: payload.email.toLowerCase(),
    };

    const existingUser = await this.UserRepo.findByEmail(user.email);

    if (existingUser) {
      throw new AppError("user already exists", StatusCodes.CONFLICT);
    }

    const newUser = await this.UserRepo.create(user);

    const tokenPayload = {
      _id: newUser._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      role: user.role,
    };

    const tokens = this.signTokens(tokenPayload);

    return { ...tokens, user: tokenPayload };
  }

  async refreshAccessToken(refreshToken) {
    if (!refreshToken) throw new notFound("Refresh token not found");

    const payload = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET);

    return { accessToken };
  }
}
