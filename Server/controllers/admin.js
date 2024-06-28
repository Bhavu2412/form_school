const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");
const Form = require("../models/form");
const Client = require("../models/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../utils/isAuth");
router.get("/", (req, resp, next) => {
  resp.json({ message: "Admin Routes" });
});

router.post("/login", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const admin = await Admin.findOne({ email: username });
    if (!admin) {
      return res.status(404).json({ message: "No Admin found!" });
    }
    const match = admin.password === password;
    if (!match) {
      return res.status(401).json({ message: "Password does not match" });
    }
    const token = jwt.sign(
      {
        userId: admin._id,
      },
      `${process.env.SECRET_KEY}`,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Admin login successful!",
      admin: admin.name,
      token: token,
      userRole: "admin",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
});

router.post("/finduser", isAuth, async (req, res, next) => {
  const { Id } = req.body;
  try {
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
router.post("/deleteuser", isAuth, async (req, res) => {
  const uId = req.body.userId;
  const { userId } = req.user;
  try {
    const user = await User.findById(uId);
    if (!user) {
      return res.status(400).json({ message: "No user found to delete!" });
    }
    await Admin.updateMany({}, { $pull: { user: uId } });
    await User.deleteOne({ _id: uId });
    await Form.deleteMany({ user: uId });
    res.status(200).json({
      message: "Deleted the user and related forms successfully!",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later!" });
  }
});

router.post("/deleteform", isAuth, async (req, res) => {
  const { Id } = req.body;
  const { userId } = req.user;
  try {
    const form = await Form.findById(Id);
    if (!form) {
      return res.status(404).json({ message: "Form not found!" });
    }
    await Form.deleteOne({ _id: Id });
    await Admin.updateMany({}, { $pull: { form: Id } });
    await User.updateMany({}, { $pull: { form: Id } });
    await Client.updateMany({}, { $pull: { forms: { form: Id } } });
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later" });
  }
});

router.post("/findform", isAuth, async (req, res, next) => {
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
router.post("/analyse", isAuth, async (req, res, next) => {
  const adminId = req.user.userId;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    const uniqueClientsCount = await Client.countDocuments();
    const adminUsers = admin.user || [];
    const adminForms = admin.form || [];

    // Retrieve the users and their associated clients
    const users = await User.find({ _id: { $in: adminUsers } });
    const usersWithClients = await Promise.all(
      users.map(async (user) => {
        const userClients = await Client.find({ _id: { $in: user.client } });
        return {
          ...user.toObject(),
          clients: userClients,
        };
      })
    );

    const forms = await Form.find({ _id: { $in: adminForms } });

    return res.status(200).json({
      uniqueClientsCount,
      users: usersWithClients,
      forms: forms,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again later!" });
  }
});

module.exports = router;
