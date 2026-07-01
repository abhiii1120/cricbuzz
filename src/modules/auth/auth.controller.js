import AuthService from "./auth.service.js";
import env from '../../config/env.js'
export default class AuthController {
  constructor() {
    this.AuthService = new AuthService();
  }

  async GoogleCallback(req, res) {
    const { accessToken, refreshToken } = await this.AuthService.CreateUser(
      req.user,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", refreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.redirect(env.REDIRECT_URL)
  }
}
