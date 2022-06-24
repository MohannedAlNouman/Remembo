const mongoose = require("../DB/index");

const dataSchema = new mongoose.Schema({
  value: String,
  time: String
});
const Data = new mongoose.model("Item", dataSchema);

module.exports = Data;
