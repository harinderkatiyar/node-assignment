const express = require("express");
const cors = require("cors");
const nocache = require("nocache");
const routes = require("./app/routes");
require("dotenv").config();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const app = express();
//middleware
app.use(cors());
app.use(nocache());
app.disable("x-powered-by");
// parse requests of content-type - application/json
app.use(express.json({ limit: "20mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ limit: "20mb", extended: true, parameterLimit: 50000 })
);

//middleware setup
app.use("/api/", routes).use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*"); // allow request from all origin
  response.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  response.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, refreshToken"
  );
  next();
});

// test route
app.get("/", (req, res) => {
  res.send("Welcome to test application.");
});
// 404 route
app.get("*", function (req, res) {
  res.send("what???", 404);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
