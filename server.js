import createApp from "./src/app.js";

let app = createApp();

app.listen(3000,() => {
    console.log("server running on port", 3000);
})