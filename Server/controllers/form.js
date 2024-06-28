const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");
const Form = require("../models/form");
const Client = require("../models/client");
const nodemailer = require("nodemailer");
const isAuth = require("../utils/isAuth");
router.post("/find", isAuth, async (req, res, next) => {
  const { userId } = req.user;
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
router.post("/create", isAuth, async (req, res, next) => {
  const { name, questions, description } = req.body;
  const { userId } = req.user;
  const code = Math.floor(Math.random() * 10000000) + 100000;

  try {
    const form = new Form({
      name: name,
      user: userId,
      questions: questions,
      description: description,
      code: code,
    });

    await form.save();

    const user = await User.findById(userId);
    const admin = await Admin.findById("667e8d7917648902bcc169b0");

    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }
    if (!admin) {
      return res.status(404).json({ message: "No admin found!" });
    }
    user.form.push(form._id);
    await user.save();

    admin.form.push(form._id);
    await admin.save();

    res
      .status(200)
      .json({ message: "Form created successfully", code: form.code });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

router.delete("/delete", isAuth, async (req, res, next) => {
  const { id } = req.body;
  const { userId } = req.user;
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
    // console.log(err);
    res
      .status(200)
      .json({ message: "Internal server error. Please try again later!" });
  }
});
router.put("/edit/:id", isAuth, async (req, res, next) => {
  const { id } = req.params;
  const { description, questions, name } = req.body;
  const { userId } = req.user;
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
    // console.log(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

router.put("/addq", isAuth, async (req, res, next) => {
  const { question, Id } = req.body;
  const { userId } = req.user;
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
    // console.log(err);
    res.status(500).json({
      message: "Internal server error. Please try again later.!",
    });
  }
});
router.delete("/deleteq", isAuth, async (req, res, next) => {
  const { quest, Id } = req.body;
  const { userId } = req.user;
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
    // console.log(err);
    res.status(500).json({
      message: "Internal server error. Please try again later.!",
    });
  }
});
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other services
  auth: {
    user: "nodetutcomplete@gmail.com", // Replace with your email
    pass: "objltxzyqscrmwzp", // Replace with your email password
  },
});

router.post("/api/contact", isAuth, (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: "patelbhavya2412@gmail.com", // Replace with your receiving email
    subject: `Contact Form Submission - ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to send email" });
    }

    res.json({ status: "success", message: "Issue submitted successfully" });
  });
});

module.exports = router;
