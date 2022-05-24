const express = require('express');
const mongoose = require("mongoose");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://pizzapp:AvlCeQncrTgFySQ9@cluster0.ey4ds.mongodb.net/test"
  )
  .then(() => {
    console.log("Connection to DB was successful");
  });

const User = require("./routes/User.routes");
app.use("/user", User);

app.get("/", (req, res) => {
  res.send("This is the first response");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("app is running on ", port);
});
