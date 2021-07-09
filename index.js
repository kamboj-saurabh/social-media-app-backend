const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const signup_router = require("./router/signup.router.js");
const login_router = require("./router/login.router.js");
const user_router = require("./router/user.router.js");
const post_router = require("./router/post.router.js");
const notification_router = require("./router/notification.router.js");
const follow_router = require("./router/follow.router.js");

const { DBConnection } = require("./db/db.connection.js");
DBConnection();

app.use("/signup", signup_router);
app.use("/login", login_router);
app.use("/user", user_router);
app.use("/post", post_router);
app.use("/notification", notification_router);
app.use("/follow", follow_router);

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.use((req, res) => {
  res
    .status(404)
    .json({
      success: false,
      message: "route not found on server, please check",
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({
      success: false,
      message: "error occured, see the errorMessage key for more details",
      errorMessage: err.message,
    });
});

app.listen(PORT, () => {
  console.log("server started");
});
