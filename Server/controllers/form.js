const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");
const Form = require("../models/form");
const Client = require("../models/client");
router.post("/findform", async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }
    const forms = user.form;
    const formarray = [];
    for (const frm of forms) {
      const fm = await Form.findById(frm);
      if (fm) {
        formarray.push(fm);
      }
    }
    if (formarray.length === 0) {
      return res
        .status(404)
        .json({ message: "No form published by the user!" });
    }
    res
      .status(200)
      .json({ message: "Form are fetched correctly", form: formarray });
  } catch (err) {
    cosnole.log(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});
router.post("/createform", (req, res, next) => {
  const { user, name, questions, description } = req.body;
  const code = Math.floor(Math.random() * 10000000) + 100000;
  const form = new Form({
    name: name,
    user: user,
    questions: questions,
    description: description,
    code: code,
  });
  form.save();
  User.findById(user)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "No user found!" });
      }
      user.form.push(form._id);
      user.save();
      res.status(200).json({ message: "form created successfully" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Internal server error. Please try again later." });
    });
});
router.delete("/deleteform", async (req, res, next) => {
  const { id, userId } = req.body;
  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found!" });
    }
    const user = await User.findById(form.user.toString());
    if (user._id.toString() !== userId) {
      return res
        .status(404)
        .json({ message: "Form can be deleted by only the one who created!" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.form = user.form.filter((formId) => formId.toString() !== id);
    await user.save();
    const response = await Form.deleteOne({ _id: id });
    res.status(200).json({
      message: "Form Has been deleted successfully!",
      response: response,
    });
  } catch (err) {
    console.log(err);
    res
      .status(200)
      .json({ message: "Internal server error. Please try again later!" });
  }
});
router.put("/editform/:id", async (req, res, next) => {
  const { id } = req.params;
  const { description, questions, name, userId } = req.body;
  try {
    const form = await Form.findById(id);
    if (!form) {
      res.status(404).json({ message: "Form not found!" });
    }
    if (form.user.toString() !== userId) {
      return res.status(404).json({ message: "You cannot edit the form" });
    }
    if (description) {
      form.description = description;
    }
    if (name) {
      form.name = name;
    }
    if (questions) {
      form.questions = questions;
    }
    await form.save();
    res.status(200).json({ message: "Form updated successfully!" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

router.put("/addq", async (req, res, next) => {
  const { question, Id, userId } = req.body;
  try {
    const form = await Form.findById(Id);
    if (!form) {
      return res
        .status(404)
        .json({ message: "Form not found try again later!" });
    }
    if (form.user.toString() !== userId) {
      return res.status(404).json({ message: "You cannot edit the form" });
    }
    form.questions.push(question);
    await form.save();
    res.status(200).json({ message: "Question added successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error. Please try again later.!",
    });
  }
});
router.delete("/deleteq", async (req, res, next) => {
  const { quest, Id, userId } = req.body;
  try {
    const form = await Form.findById(Id);
    if (!form) {
      return res
        .status(404)
        .json({ message: "Form not found try again later!" });
    }
    if (form.user.toString() !== userId) {
      return res.status(404).json({ message: "You cannot edit the form" });
    }
    form.questions = form.questions.filter((que) => que.question != quest);
    await form.save();
    res.status(200).json({ message: "Question deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error. Please try again later.!",
    });
  }
});
module.exports = router;
