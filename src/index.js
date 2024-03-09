const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});

const app = require("./app.js");
const { connectMongodb } = require("./db/index.js");

(() => {
  try {
    connectMongodb();
    app.listen(process.env.PORT, () => {
      console.log(
        "Server is running at : http://localhost:" + process.env.PORT
      );
    });
  } catch (error) {
    console.log("Server is not listening on : http://localhost");
  }
})();
