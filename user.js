const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: String,
  password: String,
  food: String,
  color: String,
});

module.exports = mongoose.model("User", user);