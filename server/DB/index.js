require('dotenv').config();

const mongoose = require("mongoose");
main().catch(err => console.log(err));

// process.env.REMEMBO_MONGODB
async function main() {
  await mongoose.connect("mongodb://localhost:27017/RememboDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = mongoose;
