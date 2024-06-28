const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const adminController = require("./controllers/admin");
const clientController = require("./controllers/client");
const formController = require("./controllers/form");
const userController = require("./controllers/users");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Hi! there" });
});
app.use("/admin", adminController);
app.use("/user", userController);
app.use("/client", clientController);
app.use("/form", formController);
mongoose.connect("mongodb://localhost:27017/formData").then(() => {
  console.log("Connected to database!👍");
});
app.listen(8080, () => {
  console.log("Connecting has been established with the server!👍");
});
