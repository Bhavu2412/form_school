const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");
const Form = require("../models/form");
const Client = require("../models/client");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
  const { email, name, username, profession, password } = req.body;
  User.find({ username: username })
    .then((user) => {
      if (user) {
        res.status(400).json({
          message:
            "User found with the same username! please try again with diffrent username",
        });
      }
      return User.find({ email: email });
    })
    .then((user) => {
      if (user) {
        res.status(400).json({
          message:
            "User found with the same email! please try again with diffrent email",
        });
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashPass) => {
      if (!hashPass) {
        res.status(400).json({ message: "Hash Password not found!" });
      }
      const user = new User({
        username: username,
        password: hashPass,
        name: name,
        proffession: profession,
        email: email,
      });
      user.save();
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Internal server error. Please try again later" });
    });
});

router.post("/login", (req, res, next) => {
  const { identifier, password } = req.body;

  User.findOne({ $or: [{ username: identifier }, { email: identifier }] })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "No user found with the given username or email!",
        });
      }
      return bcrypt.compare(password, user.password);
    })
    .then((match) => {
      if (!match) {
        return res.status(400).json({ message: "Incorrect password!" });
      }
      res.status(200).json({ message: "Login successful!", user: user });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Internal server error. Please try again later" });
    });
});
router.delete("/removeuser", (req, resp, next) => {
  const Id = req.body.userId;
  User.find(Id)
    .then((user) => {
      if (!user) {
        resp.status(400).json({ message: "No user found to delete!" });
      }
      return User.deleteOne(Id);
    })
    .then((response) => {
      resp.status(200).json({ message: "User Deleted", user: response });
    })
    .catch((err) => {
      resp
        .status(500)
        .json({ message: "Internal server error please try again later!" });
    });
});
module.exports = router;
