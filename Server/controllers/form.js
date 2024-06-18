const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");
const Form = require("../models/form");
const Client = require("../models/client");
xrouter.post("/findform", (req, res, next) => {
  const { id } = req.body;
  Form.findById(id).then((form) => {
    if (!form) {
      res.status(404).json({ message: "Form not found!" });
    }
    res.status(200).json({ message: "Found form!", form: form });
  });
});
router.post("/createform", (req, res, next) => {
  const { user, name, questions, description } = req.body;
  const code = Math.floor(Math.random() * 10000000) + 100000;
  const form = new Form({
    name: name,
    user: user,
    questions: questions,
    description: description,
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
router.delete("/deleteform", (req, res, next) => {
  const { id } = req.body;
  Form.find(id)
    .then((form) => {
      if (!form) {
        res.status(404).json({ message: "Form not found!" });
      }
      return User.findById(form);
    })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      user.form.filter((formId) => formId.toString() !== id);
      user.save();
      return Form.deleteOne(id);
    })
    .then((resp) => {
      res
        .status(200)
        .json({
          message: "Form Has been deleted successfully!",
          response: resp,
        });
    })
    .catch((err) => {
      res
        .status(200)
        .json({ message: "Internal server error. Please try again later!" });
    });
});
router.put("/editform/:id", async (req, res, next) => {
  const { id } = req.params;
  const { description, questions, name } = req.body;
  try {
    const form = await Form.findById(id);
    if (!form) {
      res.status(404).json({ message: "Form not found!" });
    }
    if (description) {
      form.description = description;
    }
    if (name) {
      form.name = name;
    }
    if (questions) {
      questions.forEach((updatedQuestion) => {
        const question = form.question.id(updatedQuestion._id);
        if (question) {
          if (updatedQuestion.options) {
            question.options = updatedQuestion.options;
          }
          if (updatedQuestion.answer) {
            question.answer = updatedQuestion.answer;
          }
        }
      });
    }
    await form.save();
    res.status(200).json({ message: "Form updated successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

router.put("/addq", (req, res, next) => {
  const { question, Id } = req.body;
  Form.findById(Id)
    .then((form) => {
      if (!form) {
        res.status(404).json({ message: "Form not found try again later!" });
      }
      form.questions.push(question);
      form.save();
      res.status(200).json({ message: "Question added successfully!" });
    })
    .catch((err) => {
      res.status.json({
        message: "Internal server error. Please try again later.!",
      });
    });
});
