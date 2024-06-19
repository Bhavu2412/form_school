const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");
const Form = require("../models/form");
const Client = require("../models/client");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { email, name, username, password } = req.body;

  try {
    let client = await Client.findOne({ email: email });
    if (client) {
      return res
        .status(300)
        .json({ message: "Found a client with same email!" });
    }
    let clt = await Client.findOne({ username: username });
    if (clt) {
      return res
        .status(300)
        .json({ message: "Found a client with same username!" });
    }
    const hashPass = await bcrypt.hash(password, 12);
    if (!hashPass) {
      return res.status(400).json({ message: "Hash not generated" });
    }
    client = new Client({
      name: name,
      email: email,
      username: username,
      password: hashPass,
    });
    const response = await client.save();
    res
      .status(200)
      .json({ message: "Client Signup Successful!", response: response });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal Server Error. Please try again later" });
  }
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

router.post("/login", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const inputType = checkInput(username);
    const user = await Client.findOne({ [inputType]: username });

    if (!user) {
      return res.status(404).json({ message: "No User found!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({ message: "Password does not match" });
    }

    res.status(200).json({
      message: "Client login successful!",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
});
router.delete("/removeclient", async (req, res) => {
  const { id } = req.body;

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found!" });
    }
    await Form.updateMany({}, { $pull: { client: id } });
    await User.updateMany({}, { $pull: { client: id } });
    const response = await Client.deleteOne({ _id: id });
    res.status(200).json({
      message: "Client deleted successfully",
      response: response,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error. Please try again later",
      error: err,
    });
  }
});
router.post("/filform", async (req, res, next) => {
  const { code, Id, answers } = req.body;
  try {
    const form = await Form.findOne({ code: code });
    if (!form) {
      return res.status(404).json({
        message: `Form with code ${code} not found or deleted by Owner!`,
      });
    }
    const client = await Client.findById(Id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    let correctAnswers = 0;
    form.questions.forEach((que, index) => {
      if (que.answer === answers[index]) {
        correctAnswers++;
      }
    });
    const performance = (correctAnswers / form.questions.length) * 100;
    client.forms.push({
      form: form._id,
      answers: answers,
      performance: performance,
    });
    await client.save();
    await Form.updateMany({ _id: form._id }, { $push: { client: Id } });
    await User.updateMany({ _id: form.user }, { $push: { client: Id } });
    res
      .status(200)
      .json({ message: "Form filled successfully!", performance: performance });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error.Please try again later" });
  }
});
module.exports = router;
