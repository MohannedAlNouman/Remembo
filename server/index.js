const path = require("path");

const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const mongoose = require("mongoose");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/RememboDB");
  const userSchema = new mongoose.Schema({
    user: String
  });
  const User = mongoose.model("User", userSchema);
}

// mongo "mongodb+srv://cluster0.ww7po.mongodb.net/myFirstDatabase" --username admin

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({message: "Get request sent"});
});

app.post("/api", (req, res) => {
  console.log(req.body);
  res.json({message: "Post request sent"});
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
