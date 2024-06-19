const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");
const Form = require("../models/form");
const Client = require("../models/client");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res, next) => {
  const { email, name, username, profession, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({
        message:
          "User found with the same username! please try again with diffrent username",
        user: user,
      });
    }
    const usr = await User.findOne({ email: email });
    if (usr) {
      return res.status(400).json({
        message:
          "User found with the same email! please try again with diffrent email",
        user: usr,
      });
    }
    const hashPass = await bcrypt.hash(password, 12);
    if (!hashPass) {
      res.status(400).json({ message: "Hash Password not found!" });
    }
    const us = new User({
      username: username,
      password: hashPass,
      name: name,
      proffession: profession,
      email: email,
    });
    await us.save();
    if (!Admin.user) {
      Admin.user = []; // Initialize Admin.user as an empty array
    }
    console.log(us);
    const admin = await Admin.findById("667117d9b51cf80656699086");
    admin.user.push(us._id);
    await admin.save();
    res.status(200).json({ message: "User created successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Internal server error. Please try again later" });
  }
});

router.post("/login", async (req, res, next) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.findOne({ email: identifier });
    if (!user) {
      return res.status(400).json({
        message: "No user found with the given username or email!",
      });
    }
    const match = bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password!" });
    }
    res.status(200).json({ message: "Login successful!", user: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later" });
  }
});
router.delete("/removeuser", async (req, resp, next) => {
  const Id = req.body.Id;
  try {
    const user = await User.findById(Id);
    if (!user) {
      return resp.status(400).json({ message: "No user found to delete!" });
    }
    const adminWithUser = await Admin.findById("667117d9b51cf80656699086");
    if (adminWithUser) {
      adminWithUser.user = adminWithUser.user.filter(
        (id) => id.toString() !== Id
      );
      await adminWithUser.save();
    }
    const response = await User.findByIdAndDelete(Id);
    resp.status(200).json({ message: "User Deleted", user: response });
  } catch (err) {
    return resp
      .status(500)
      .json({ message: "Internal server error, please try again later!" });
  }
});
router.post("/analyse", async (req, res, next) => {
  const { id } = req.body;
  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(400).json({ message: "No form found!" });
    }
    const clientId = form.client;
    let performance = [];
    for (const clt of clientId) {
      let client = await Client.findById(clt);
      if (client) {
        let per = client.forms.find((form) => form.form.toString() === id);
        if (per) {
          performance.push({
            client: client.name,
            performance: per.performance,
          });
        }
      }
    }
    return res.status(200).json({
      message: "Form and clients found successful",
      performance: performance,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error, please try again later!" });
  }
});
module.exports = router;
