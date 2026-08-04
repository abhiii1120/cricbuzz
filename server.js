import createApp from "./src/app.js";
import env from "./src/config/env.js";
import logger from "./src/config/logger.js";
import { connectDB } from "./src/database/db.js";
import http from 'http';
import {Server} from "socket.io";
import { initSocket } from "./src/socket/socket.js";

let app = createApp();
const HttpServer = http.createServer(app);
const io = new Server(HttpServer,{
  cors:{
    origin:env.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
    methods:["GET","POST"],
  }
});

initSocket(io);

function startServer() {
  connectDB()
    .then(() => {
      HttpServer.listen(env.PORT, () => {
        logger.info({ port: env.PORT }, "server running on port");
      });
    })
    .catch((err) => {
      logger.error({ error: err }, "error while connecting db");
    });
}

startServer();
