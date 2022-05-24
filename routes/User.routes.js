const express = require("express");
const User = require("../schemas/User.schema");
const route = express.Router();

route.get("/", async (req, res) => {
  const allUsers = await User.find();
  res.send(allUsers);
});

route.get("/:id", (req, res) => {
  const user = User.findById(req.params.id, (error, docs) => {
    res.send(docs);
  });
});

route.post("/", async (req, res) => {
  const newUser = new User(req.body);

  const savedUser = await new User(req.body).save();
  res.send(savedUser);
});

route.put("/add_delay", async (req, res) => {
  const { user_id } = req.body;
  const updateUser = await User.findOneAndUpdate(
    { _id: user_id },
    { $push: { delays: new Date() } },
    { new: true }
  );
  res.send(updateUser);
});

route.put("/remove_delay", async (req, res) => {
  const { user_id } = req.body;
  const updateUser = await User.findOneAndUpdate(
    { _id: user_id },
    { $pop: { delays: 1 } },
    { new: true }
  );
  res.send(updateUser);
});

module.exports = route;
