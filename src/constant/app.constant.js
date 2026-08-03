export default {
  PORT: 3000,
  MONGO_URL: "mongodb://localhost:27017/cricbuzz",
  LOGGER_LEVEL: "info",
  NODE_ENV: "development",
  RATELIMIT_WINDOWMS: 15 * 60 * 1000,
  RATELIMIT: 100,
};

export const app_config = {
  cookie: {
    accessToken: {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    },
    refreshToken: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  },
};
