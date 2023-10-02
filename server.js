const express = require("express");
const db = require("./config/connections");
const routes = require("./routes");

//initialize app and set port
const PORT = 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//connect to mongoDB
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
