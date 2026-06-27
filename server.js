import createApp from "./src/app.js";
import env from "./src/config/env.js"
import logger from "./src/config/logger.js";
let app = createApp();

function startServer() {
  app.listen(env.PORT, () => {
    logger.info({port:env.PORT} , 'server running on port')
  });
}

startServer();
