const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  user_name: String,
  delays: { type: [Date], default: [] },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
