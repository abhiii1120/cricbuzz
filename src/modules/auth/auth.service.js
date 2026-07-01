import UserRepo from "../../repository/user.repository.js";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
export default class AuthService {
  constructor() {
    this.UserRepo = new UserRepo();
  }

  async CreateUser(user) {
    const isUser = await this.UserRepo.findByEmail(user.email[0].value);
    let result = isUser;

    if (!isUser) {
      const _user = await this.UserRepo.create({
        email: user.emails[0].value,
        picture: user.photos[0].value,
        email: user.displayName,
      });
      result = _user;
    }

    let data = {
      _id: result._id,
      email: user.emails[0].value,
      picture: user.photos[0].value,
      name: user.displayName,
    };

    let refreshToken = jwt.sign(data, env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30D",
    });

    let accessToken = jwt.sign(data, env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1H",
    });

    return { accessToken, refreshToken };
  }
}
