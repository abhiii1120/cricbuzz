import createApp from "./src/app.js";
import env from "./src/config/env.js"
let app = createApp();

function startServer() {
  app.listen(env.PORT, () => {
    console.log("server running on port", env.PORT);
  });
}

startServer();
