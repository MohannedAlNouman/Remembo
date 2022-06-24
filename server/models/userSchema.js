const mongoose = require("../DB/index");
const List = require("./listSchema");

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  lists: [List.schema]
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
