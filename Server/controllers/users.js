const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");
const Form = require("../models/form");
const Client = require("../models/client");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const isAuth = require("../utils/isAuth");
cloudinary.config({
  cloud_name: "ddej2sdnm",
  api_key: "922999157567341",
  api_secret: "cRKqrFP_cM92NdZCQ3Lwtt05tLI",
});
async function uploadToCloudinary(filePath, tags) {
  try {
    const result = await cloudinary.uploader.upload(filePath, { tags });
    return { url: result.secure_url, error: null };
  } catch (error) {
    return { url: null, error };
  }
}
const upload = multer({ dest: "uploads/" });
router.post("/signup", upload.single("image"), async (req, res) => {
  const { email, name, username, profession, password } = req.body;
  const image = req.file.path;
  try {
    if (!image) {
      return res.status(400).json({ message: "Image not provided." });
    }

    const { url: imageUrl, error } = await uploadToCloudinary(
      image,
      "profile_users"
    );

    if (error) {
      return res
        .status(400)
        .json({ message: "Image upload failed. Please try again." });
    }

    const usr = await User.findOne({ email });
    if (usr) {
      return res.status(400).json({
        message:
          "User found with the same email! Please try again with different email",
      });
    }
    const ussr = await User.findOne({ username: username });
    if (ussr) {
      return res.status(400).json({
        message:
          "User found with the same username! Please try again with different username",
      });
    }
    const hashPass = await bcrypt.hash(password, 12);
    if (!hashPass) {
      return res.status(400).json({ message: "Hash Password not found!" });
    }

    const us = new User({
      username,
      password: hashPass,
      name,
      profession,
      email,
      image: imageUrl,
    });

    await us.save();
    const token = jwt.sign(
      {
        userId: us._id,
      },
      "bhavu2412",
      { expiresIn: "1d" }
    );
    const admin = await Admin.findById("667b9384460c437e10660dab");
    if (!admin.user) {
      admin.user = [];
    }
    admin.user.push(us._id);
    await admin.save();
    res.status(200).json({
      message: "User created successfully!",
      token: token,
      imageUrl: imageUrl,
      userRole: "user",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Internal server error. Please try again later" });
  }
});
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(400).json({
        message: "No user found!",
      });
    }
    const match = bcrypt.compare(user.password, password);
    if (!match) {
      return res.status(400).json({ message: "Password donot match!" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      "bhavu2412",
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "User login successful!",
      user: user.name,
      token: token,
      userRole: "user",
      ImageUrl: user.image,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later" });
  }
});
router.delete("/remove", isAuth, async (req, resp, next) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return resp.status(400).json({ message: "No user found to delete!" });
    }
    const adminWithUser = await Admin.findById("667b9384460c437e10660dab");
    if (adminWithUser) {
      adminWithUser.user = adminWithUser.user.filter(
        (id) => id.toString() !== userId
      );
      await adminWithUser.save();
    }
    const response = await User.findByIdAndDelete(userId);
    resp.status(200).json({ message: "User Deleted", user: response });
  } catch (err) {
    return resp
      .status(500)
      .json({ message: "Internal server error, please try again later!" });
  }
});
router.post("/deleteform", isAuth, async (req, res, next) => {
  const { userId } = req.user;
  const formId = req.body.Id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const userForms = user.form || [];
    if (!userForms.includes(formId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to the form!" });
    }
    const form = await Form.findByIdAndDelete(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found!" });
    }
    user.form = user.form.filter((id) => id.toString() !== formId);
    await user.save();
    await Client.updateMany(
      { "forms.form": formId },
      { $pull: { forms: { form: formId } } }
    );

    res.status(200).json({ message: "Form deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error, please try again later!",
    });
  }
});

router.post("/analyse", isAuth, async (req, res, next) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const uniqueClientsCount = await Client.countDocuments();
    const userClients = user.client || [];
    const userForms = user.form || [];
    const clients = await Client.find({ _id: { $in: userClients } });
    const forms = await Form.find({ _id: { $in: userForms } });

    res.status(200).json({
      uniqueClientsCount: uniqueClientsCount,
      clients: clients,
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
