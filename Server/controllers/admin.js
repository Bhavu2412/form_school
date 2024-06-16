const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");
router.get("/", (req, resp, next) => {
  resp.json({ message: "Admin Routes" });
});
router.post("/finduser", (req, res, next) => {
  const name = req.body.username;
  User.find({ name: name })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: "User not found!" });
      }
      res.status(200).json({
        message: "User Found",
        Name: user.name,
        Email: user.email,
        Username: user.username,
        Profession: user.profession,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Internal server error please try again later!" });
    });
});
router.post("/deleteuser", (req, resp, next) => {
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

router.post("/deleteform", (req, resp, next) => {
  const Id = req.body.formId;
  Form.find(Id)
    .then((form) => {
      if (!form) {
        resp.status(400).json({ message: "No form found to delete!" });
      }
      return Form.deleteOne(Id);
    })
    .then((response) => {
      resp.status(200).json({ message: "Form Deleted", form: response });
    })
    .catch((err) => {
      resp
        .status(500)
        .json({ message: "Internal server error please try again later!" });
    });
});

router.post("/findform", (req, res, next) => {
  const Id = req.body.formId;
  Form.find(Id)
    .then((form) => {
      if (!form) {
        res.status(400).json({ message: "Form not found!" });
      }
      res.status(200).json({
        message: "Form Found",
        User: form.user,
        Code: form.code,
        Client: form.client,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Internal server error please try again later!" });
    });
});
module.exports = router;
