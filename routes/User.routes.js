const express = require("express");
const User = require("../schemas/User.schema");
const route = express.Router();

function updateDelay({ user_id, num_delays }) {
  return new Promise(async (resolve, reject) => {
    await User.findOne({ _id: user_id }, async (err, user) => {
      if (err) reject(err);

      if (num_delays >= 0) {
        const newDelays = Array.from(Array(num_delays), () => new Date());
        user.delays = [...user.delays, ...newDelays];
      } else {
        user.delays.splice(
          user.delays.length + num_delays,
          Math.abs(num_delays)
        );
      }
      await user.save(function (err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    }).clone();
  });
}

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
    { $push: { delays: { $each: [1, 2, 3] } } },
    { new: true }
  );
  res.send(updateUser);
});

route.put("/update_delays", async (req, res) => {
  const functions = req.body.map((element) => updateDelay(element));
  Promise.all(functions).then(async () => {
    console.log("all promises were fulfilled");
    res.send(await User.find({}));
  });
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
