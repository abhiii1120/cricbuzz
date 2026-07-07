import AuthService from "./auth.service.js";
import env from "../../../config/env.js";
import { app_config } from "../../../constant/app.constant.js";
import UnAuthorize from "../../../shared/error/unAuthorize.error.js";
import { setAuthCookies } from "../../../shared/utils/authCookies.js";
import { StatusCodes } from "http-status-codes";
export default class AuthController {
  constructor() {
    this.AuthService = new AuthService();
  }

  async getMe() {
    throw new UnAuthorize("user not authorize");
  }

  async GoogleCallback(req, res) {
    const { accessToken, refreshToken } = await this.AuthService.CreateUser(
      req.user,
    );

    res.cookie("refreshToken", refreshToken, app_config.cookie.refreshToken);

    res.cookie("accessToken", refreshToken, app_config.cookie.accessToken);

    res.redirect(env.REDIRECT_URL);
  }

  async registerController(req, res) {
    const userData = req.validated.body;
    const { accessToken, refreshToken, user } =
      await this.AuthService.registerUser(userData);

    setAuthCookies(res, accessToken, refreshToken);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User Registered successfully",
      data: user,
    });
  }
}
