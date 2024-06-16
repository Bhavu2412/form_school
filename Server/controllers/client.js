const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");
const Form = require("../models/form");
const Client = require("../models/client");
const bcrypt = require("bcrypt");

router.post("/clientsignup", (req, res, next) => {
  const { email, name, username, password } = req.body;
  Client.find({ email: email })
    .then((client) => {
      if (client) {
        res.status(300).json({ message: "Found a client with same email!" });
      }
      return Client.find({ username: username });
    })
    .then((client) => {
      if (client) {
        res.status(300).json({ message: "Found a client with same email!" });
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashPass) => {
      if (!hashPass) {
        res.status(400).json({ message: "Hash not generated" });
      }
      const client = new Client({
        name: name,
        email: email,
        username: username,
        password: hashPass,
      });
      return client.save();
    })
    .then((response) => {
      res
        .status(200)
        .json({ message: "Client Signup Successful!", response: response });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Internal Server Error. Please try again later" });
    });
});
function isEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}

function isUsername(input) {
  const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  return usernameRegex.test(input) && !isEmail(input);
}

function checkInput(input) {
  if (isEmail(input)) {
    return "email";
  } else if (isUsername(input)) {
    return "username";
  } else {
    return "invalid";
  }
}

router.post("/clientlogin", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const inputType = checkInput(username);
  Client({ inputType: username })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "No User found!" });
      }
      return bcrypt.compare(password, user.password);
    })
    .then((match) => {
      if (!match) {
        res.status(404).json({ message: "Password donot match" });
      }
      res.status(200).json({
        message: "Password matched successfully!",
        response: response,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Internal server error. Please try again." });
    });
});
module.exports = router;
