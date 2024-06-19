const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");
const Form = require("../models/form");
const Client = require("../models/client");
const bcrypt = require("bcrypt");
router.get("/", (req, resp, next) => {
  resp.json({ message: "Admin Routes" });
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

router.post("/adminlogin", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const inputType = checkInput(username);
  try {
    const admin = await Admin.findOne({ [inputType]: username });
    if (!admin) {
      return res.status(404).json({ message: "No Admin found!" });
    }
    const match = admin.password === password;
    if (!match) {
      return res.status(401).json({ message: "Password does not match" });
    }
    res.status(200).json({
      message: "Password matched successfully!",
      admin: admin,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
});

router.post("/finduser", async (req, res, next) => {
  try {
    const { Id } = req.body;
    const user = await User.findById(Id);

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    res.status(200).json({
      message: "User Found",
      user: user,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later!" });
  }
});
router.delete("/deleteuser", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "No user found to delete!" });
    }
    await Admin.updateMany({}, { $pull: { user: userId } });
    await User.deleteOne({ _id: userId });
    await Form.deleteMany({ user: userId });
    res.status(200).json({
      message: "Deleted the user and related forms successfully!",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later!" });
  }
});

router.delete("/deleteform", async (req, res) => {
  const { Id } = req.body;
  try {
    const form = await Form.findById(Id);
    if (!form) {
      return res.status(404).json({ message: "Form not found!" });
    }
    await Form.deleteOne({ _id: Id });
    await Admin.updateMany({}, { $pull: { forms: { form: Id } } });
    await User.updateMany({}, { $pull: { forms: { form: Id } } });
    await Client.updateMany({}, { $pull: { forms: { form: Id } } });
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later" });
  }
});

router.post("/findform", async (req, res, next) => {
  try {
    const formId = req.body.formId;
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(400).json({ message: "Form not found!" });
    }

    res.status(200).json({
      message: "Form Found",
      User: form.user,
      Code: form.code,
      Client: form.client,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later!" });
  }
});
module.exports = router;
