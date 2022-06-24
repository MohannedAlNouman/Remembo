const mongoose = require("../DB/index");
const Data = require("./dataSchema");

const listSchema = new mongoose.Schema({
  title: String,
  dataSet: [Data.schema]
});
const List = new mongoose.model("List", listSchema);

module.exports = List;
