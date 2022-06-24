const path = require("path");

const express = require("express");
const app = express();
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

//not required for production
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const db = require("./DB/index");
const User = require("./models/userSchema");
const List = require("./models/listSchema");
const Data = require("./models/dataSchema");

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({
    message: "Get request received"
  });
});

app.post("/api", (req, res) => {
  console.log(req.body);
  let newData = new Data({value: req.body.data, time: req.body.time})
  newData.save(err=>{
    res.send({
      message: "Post request sent"
    });
  })
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
