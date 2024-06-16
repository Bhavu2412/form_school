const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Hi! there" });
});
mongoose.connect("mongodb://localhost:27017/formData").then(() => {
  console.log("Connected to database!");
  console.log("You are eady to go!");
});
app.listen(8080, () => {
  console.log("Connecting has been established with the server!");
  console.log("Happy Browsing!");
});
